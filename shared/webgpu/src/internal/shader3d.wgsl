const MAX_DIR_LIGHTS: u32 = 4;
const MAX_POINT_LIGHTS: u32 = 4;

struct DirectionalLight {
  dir: vec4<f32>,
  col: vec4<f32>,
};

struct PointLight {
  pos: vec4<f32>,  // Position of the light
  col: vec4<f32>,  // Color of the light
};

struct SceneData {
  view: mat4x4<f32>,
  invertView: mat4x4<f32>,
  projection: mat4x4<f32>,
};

struct ModelData {
  model: mat4x4<f32>,
  modelInverseTranspose: mat4x4<f32>,
};

struct SceneLights {
  dirLights: array<DirectionalLight, MAX_DIR_LIGHTS>,
  pointLights: array<PointLight, MAX_POINT_LIGHTS>,
  ambient: vec4<f32>,
};

struct ObjectData {
  model: mat4x4<f32>,
};

struct TextFragment {
  @builtin(position) position: vec4<f32>,
  @location(0) texCoord: vec2<f32>,
  @location(1) normal: vec3<f32>,
  @location(2) pos: vec3<f32>,
  @location(3) eye: vec3<f32>,
};

struct ColorFragment {
  @builtin(position) position: vec4<f32>,
  @location(0) normal: vec3<f32>,
  @location(1) pos: vec3<f32>,
  @location(2) eye: vec3<f32>,
  @location(3) viewZ: f32,
};

struct ColorLineFragment {
  @builtin(position) position: vec4<f32>,
  @location(0) viewZ: f32,
  @location(1) targetZ: f32,
};

struct ColorData {
    color: vec4<f32>,
};

struct TextureAlpha {
    value: f32
};

@group(0) @binding(0) var<uniform> sceneData: SceneData;
@group(0) @binding(1) var<uniform> sceneLights: SceneLights;
@group(1) @binding(0) var<uniform> myColor: ColorData;
@group(1) @binding(1) var<uniform> textureAlpha: TextureAlpha;
@group(2) @binding(0) var<uniform> myModel: ModelData;
@group(3) @binding(0) var myTexture0: texture_2d<f32>;
@group(3) @binding(1) var myTexture1: texture_2d<f32>;
@group(3) @binding(2) var myTexture2: texture_2d<f32>;
@group(3) @binding(3) var myTexture3: texture_2d<f32>;
@group(3) @binding(4) var mySampler: sampler;

fn computeDiffuseColor(
    eye: vec3<f32>,
    pos: vec3<f32>,
    normal: vec3<f32>,
    sceneLights: SceneLights) -> vec3<f32> {
  let shininess: f32 = 64.0;
  var diffuse: vec3<f32> = sceneLights.ambient.rgb;
  for (var i: u32 = 0; i < MAX_DIR_LIGHTS; i = i + 1) {
    if (sceneLights.dirLights[i].col.a != 0.0) {
      let lightDir: vec3<f32> = -normalize(sceneLights.dirLights[i].dir.xyz); //
      let lightColor: vec3<f32> = sceneLights.dirLights[i].col.rgb;
      var NdotL: f32 = pow(max(dot(normal, lightDir), 0), 2);
      diffuse = diffuse + (NdotL * lightColor);
    }
  }
  for (var i: u32 = 0; i < MAX_POINT_LIGHTS; i = i + 1) {
    if (sceneLights.pointLights[i].col.a != 0.0) {
      let dir = sceneLights.pointLights[i].pos.xyz - pos; //  - pos.xyz;
      let attenuation = 1.0 - clamp(pow( length(dir)/20, 2.0), 0.0, 1.0 );

      let lightDir: vec3<f32> = normalize(dir);
      let lightColor: vec3<f32> = sceneLights.pointLights[i].col.rgb;
      var NdotL: f32 = pow(max(dot(normal, lightDir), 0), 2);
      let diffuseColor = NdotL * lightColor;

      // Specular
      let V = normalize(pos - eye);
      let R = normalize(reflect(lightDir, normal));
      let specularIntensity = pow(max(dot(V, R), 0.0), shininess);
      let specularColor = specularIntensity * lightColor;

      diffuse = diffuse + (diffuseColor+ specularColor) * attenuation;
    }
  }
  return clamp(diffuse, vec3<f32>(0.0, 0.0, 0.0), vec3<f32>(1.0, 1.0, 1.0));
}


// ----------------------------------------------------------------------------------------------- Texture Shaders

@vertex
fn vertexTextureShader(
    @location(0) vertexPosition: vec3<f32>,
    @location(1) vertexTexCoord: vec2<f32>,
    @location(2) vertexNormal: vec3<f32>) -> TextFragment {
  var output: TextFragment;
  var vertex = myModel.model * vec4<f32>(vertexPosition, 1.0);
  output.position = sceneData.projection * sceneData.view * vertex;
  output.texCoord = vec2<f32>(vertexTexCoord);
  output.normal = normalize((myModel.modelInverseTranspose * vec4<f32>(vertexNormal, 0.0)).xyz);
  output.pos = vertex.xyz;
  output.eye = sceneData.invertView[3].xyz;

  return output;
}

@fragment
fn fragmentTextureShader(in: TextFragment) -> @location(0) vec4<f32> {
  let diffuse: vec3<f32> = computeDiffuseColor( in.eye, in.pos, in.normal, sceneLights );
  let texColor: vec4<f32> = textureSample(myTexture0, mySampler, in.texCoord);

  let textMix = vec4<f32>(1-textureAlpha.value);
  let finalColor = mix(texColor, myColor.color, textMix); // mixed the two colors based on alpha.
  return vec4<f32>(finalColor.rgb * diffuse, max(finalColor.a, texColor.a));
}

// ----------------------------------------------------------------------------------------------- Color Shaders

@vertex
fn vertexColorShader(
    @location(0) vertexPosition: vec3<f32>,
    @location(1) vertexNormal: vec3<f32>) -> ColorFragment {
  var output: ColorFragment;
  var vertex = myModel.model * vec4<f32>(vertexPosition, 1.0);
  var positionInViewSpace = sceneData.view * vertex;
  var bias = 0.002 * positionInViewSpace.z;

  var biasedPositionInViewSpace = positionInViewSpace - vec4<f32>(0.0, 0.0, bias, 0.0);

  output.normal = normalize((myModel.modelInverseTranspose * vec4<f32>(vertexNormal, 0.0)).xyz);
  output.position = sceneData.projection * sceneData.view * vertex;
  output.pos = vertex.xyz;
  output.eye = sceneData.invertView[3].xyz;
  output.viewZ = -biasedPositionInViewSpace.z;

  return output;
}

@fragment
fn fragmentColorShader(in: ColorFragment) -> @location(0) vec4<f32> {
  let diffuse: vec3<f32> = computeDiffuseColor( in.eye, in.pos, in.normal, sceneLights );
  let att: f32 =  1.0 - clamp(in.viewZ / 300, 0.2, 1.0); // TODO: get the 100 from the scene data

  return vec4<f32>(myColor.color.rgb * diffuse.rgb * att, myColor.color.a);
}


@vertex
fn vertexLineShader(
    @location(0) vertexPosition: vec3<f32>) -> ColorLineFragment {
  var output: ColorLineFragment;
  var vertex = myModel.model * vec4<f32>(vertexPosition, 1.0);

  let eye  = vec4<f32>(sceneData.invertView[3].xyz, 1.0);

  let eyeInViewSpace = sceneData.view * eye;
  let positionInViewSpace = sceneData.view * vertex;
  let bias = 0.002 * positionInViewSpace.z;
  let biasedPositionInViewSpace = positionInViewSpace - vec4<f32>(0.0, 0.0, bias, 0.0);
  output.viewZ = -biasedPositionInViewSpace.z;
  output.targetZ = eyeInViewSpace.z;
  output.position = sceneData.projection * biasedPositionInViewSpace;

  return output;
}


@fragment
fn fragmentLineShader(in: ColorLineFragment) -> @location(0) vec4<f32> {
  let att: f32 =  1.0 - clamp(in.viewZ / 100, 0.0, 1.0); // TODO: get the 100 from the scene data

  return vec4<f32>(myColor.color.rgb, myColor.color.a * att);
}
