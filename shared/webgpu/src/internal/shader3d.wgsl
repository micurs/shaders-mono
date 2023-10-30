const MAX_DIR_LIGHTS: u32 = 4;
const MAX_POINT_LIGHTS: u32 = 4;

struct DirectionalLight {
  dir: vec4<f32>,
  col: vec4<f32>,
};

struct PointLight {
  pos: vec4<f32>,  // Position of the light
  col: vec4<f32>,  // Color of the light
  // Any other properties relevant for point lights, like attenuation factors
};

struct SceneData {
  view: mat4x4<f32>,
  invertView: mat4x4<f32>,
  projection: mat4x4<f32>,
};

struct SceneLights {
  dirLights: array<DirectionalLight, MAX_DIR_LIGHTS>,
  pointLights: array<PointLight, MAX_POINT_LIGHTS>,
};

struct ObjectData {
  model: mat4x4<f32>,
};

struct TextFragment {
  @builtin(position) position: vec4<f32>,
  @location(0) texCoord: vec2<f32>,
  @location(1) normal: vec3<f32>,
};

struct ColorFragment {
  @builtin(position) position: vec4<f32>,
  @location(0) normal: vec3<f32>,
  @location(1) light: vec4<f32>,
  @location(3) lightCol: vec4<f32>,
};

struct ColorData {
    color: vec4<f32>,
};


@group(0) @binding(0) var<uniform> sceneData: SceneData;
@group(0) @binding(1) var<uniform> sceneLights: SceneLights;
@group(1) @binding(0) var<uniform> myColor: ColorData;
@group(2) @binding(0) var myTexture: texture_2d<f32>;
@group(2) @binding(1) var mySampler: sampler;

fn computeDiffuseColor(
    normal: vec3<f32>,
    sceneLights: SceneLights) -> vec3<f32> {

  var diffuseColor: vec3<f32> = vec3<f32>(0.1, 0.1, 0.1);
  for (var i: u32 = 0; i < MAX_DIR_LIGHTS; i = i + 1) {
    if (sceneLights.dirLights[i].col.a != 0.0) {
      let lightDir: vec3<f32> = normalize(sceneLights.dirLights[i].dir.xyz); //
      let lightColor: vec3<f32> = sceneLights.dirLights[i].col.rgb; // vec3<f32>(1.0, 0.2, 0.2); //
      var NdotL: f32 = pow(max(dot(normal, lightDir), 0), 2);
      diffuseColor = diffuseColor + (NdotL * lightColor);
    }
  }
  // for (var i: u32 = 0; i < MAX_POINT_LIGHTS; i = i + 1) {
  //   let lightDir: vec3<f32> = normalize(pointLights[i].pos.xyz);
  //   let lightColor: vec3<f32> = pointLights[i].col.rgb;
  //   var NdotL: f32 = pow(max(dot(normal, lightDir), 0), 2);
  //   // var NdotL: f32 = dot(normal, lightDir); // No pow and max version
  //   diffuseColor = diffuseColor + (NdotL * lightColor);
  // }
  return clamp(diffuseColor, vec3<f32>(0.2, 0.2, 0.2), vec3<f32>(1.0, 1.0, 1.0));
}


// ----------------------------------------------------------------------------------------------- Texture Shaders

@vertex
fn vertexTextureShader(
    @location(0) vertexPosition: vec3<f32>,
    @location(1) vertexTexCoord: vec2<f32>,
    @location(2) vertexNormal: vec3<f32>) -> TextFragment {
  var output: TextFragment;
  output.position = sceneData.projection * sceneData.view * vec4<f32>(vertexPosition, 1.0);
  output.texCoord = vec2<f32>(vertexTexCoord);

  // Transform the normal with the transpose of the inverse of the model matrix
  // (only needed if the model matrix is not identity?)
  //  normalize(mat3x3<f32>(transpose(inverse(sceneData.model))) * vertexNormal);
  output.normal = vertexNormal;

  return output;
}

@fragment
fn fragmentTextureShader(in: TextFragment) -> @location(0) vec4<f32> {
  let diffuse: vec3<f32> = computeDiffuseColor( in.normal, sceneLights );

  let texColor: vec4<f32> = textureSample(myTexture, mySampler, in.texCoord);

  return vec4<f32>(texColor.rgb * diffuse, 1.0);
}

// ----------------------------------------------------------------------------------------------- Color Shaders

@vertex
fn vertexColorShader(
    @location(0) vertexPosition: vec3<f32>,
    @location(1) vertexNormal: vec3<f32>) -> ColorFragment {
  var output: ColorFragment;
  output.position = sceneData.projection * sceneData.view * vec4<f32>(vertexPosition, 1.0);
  output.normal = vertexNormal;

  // Transform the light direction in camera coordinat with the inverse of the view matrix to view space
  // output.light =  normalize(sceneData.invertView * sceneData.light.dir);
  // output.lightCol = sceneData.light.col;
  return output;
}

@fragment
fn fragmentColorShader(in: ColorFragment) -> @location(0) vec4<f32> {
  let diffuse: vec3<f32> = computeDiffuseColor( in.normal, sceneLights );

  // return vec4<f32>(myColor.color.rgb * diffuse , 1.0);
  return vec4<f32>(myColor.color.rgb * diffuse.rgb , 1.0);
}
