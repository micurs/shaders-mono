struct TransfornData {
  model: mat4x4<f32>,
  view: mat4x4<f32>,
  invertView: mat4x4<f32>,
  projection: mat4x4<f32>,
};

struct TextFragment {
  @builtin(position) position: vec4<f32>,
  @location(0) texCoord: vec2<f32>,
  @location(1) normal: vec3<f32>,
  @location(2) light: vec4<f32>,
};

struct ColorFragment {
  @builtin(position) position: vec4<f32>,
  @location(0) normal: vec3<f32>,
  @location(1) light: vec4<f32>,
};

struct ColorData {
    color: vec4<f32>,
};


@binding(0) @group(0) var<uniform> transformData: TransfornData;
@binding(0) @group(1) var<uniform> myColor: ColorData;
@binding(0) @group(2) var myTexture: texture_2d<f32>;
@binding(1) @group(2) var mySampler: sampler;

// ----------------------------------------------------------------------------------------------- Texture Shaders

@vertex
fn vertexTextureShader(
    @location(0) vertexPosition: vec3<f32>,
    @location(1) vertexTexCoord: vec2<f32>,
    @location(2) vertexNormal: vec3<f32>) -> TextFragment {
  var output: TextFragment;
  output.position = transformData.projection * transformData.view * transformData.model * vec4<f32>(vertexPosition, 1.0);
  output.texCoord = vec2<f32>(vertexTexCoord);

  // Transform the normal with the transpose of the inverse of the model matrix
  // (only needed if the model matrix is not identity?)
  //  normalize(mat3x3<f32>(transpose(inverse(transformData.model))) * vertexNormal);
  output.normal = vertexNormal;

  // Transform the light direction in camera coordinat with the inverse of the view matrix to view space
  var lightDir: vec4<f32> = normalize(transformData.invertView * vec4<f32>(-0.3, -0.3, -1.0, 0.0));
  output.light = lightDir;
  return output;
}

@fragment
fn fragmentTextureShader(in: TextFragment) -> @location(0) vec4<f32> {
  // Directional light properties
  let lightDir: vec3<f32> = normalize(in.light.xyz); // Example light direction
  let lightColor: vec3<f32> = vec3<f32>(1.0, 1.0, 1.0) * 0.8; // White light
  let ambientColor: vec3<f32> = vec3<f32>(0.6, 0.6, 1.0) * 0.2; // White light

  // Compute Lambertian reflection
  var NdotL: f32 = pow(max(dot(in.normal, lightDir), 0), 2);
  // var NdotL: f32 = dot(in.normal, lightDir); // no pow and max version
  let diffuse: vec3<f32> = (NdotL * lightColor);

  let texColor: vec4<f32> = textureSample(myTexture, mySampler, in.texCoord);

  return vec4<f32>(texColor.rgb * (diffuse + ambientColor), 1.0);
}

// ----------------------------------------------------------------------------------------------- Color Shaders

@vertex
fn vertexColorShader(
    @location(0) vertexPosition: vec3<f32>,
    @location(1) vertexNormal: vec3<f32>) -> ColorFragment {
  var output: ColorFragment;
  output.position = transformData.projection * transformData.view * transformData.model * vec4<f32>(vertexPosition, 1.0);
  output.normal = vertexNormal;

  // Transform the light direction in camera coordinat with the inverse of the view matrix to view space
  var lightDir: vec4<f32> = normalize(transformData.invertView * vec4<f32>(-0.3, -0.3, -1.0, 0.0));
  output.light = lightDir;
  return output;
}

@fragment
fn fragmentColorShader(in: ColorFragment) -> @location(0) vec4<f32> {
  // Directional light properties
  let lightDir: vec3<f32> = normalize(in.light.xyz); // Example light direction
  let lightColor: vec3<f32> = vec3<f32>(1.0, 1.0, 1.0) * 0.8; // White light
  let ambientColor: vec3<f32> = vec3<f32>(0.6, 0.6, 1.0) * 0.2; // White light

  // Compute Lambertian reflection
  var NdotL: f32 = pow(max(dot(in.normal, lightDir), 0), 2);
  // var NdotL: f32 = dot(in.normal, lightDir); // No pow anad max version

  let diffuse: vec3<f32> = (NdotL * lightColor);

  // let texColor: vec4<f32> = vec4<f32>(0.4, 0.8, 1.0, 1.0);

  return vec4<f32>(myColor.color.rgb * (diffuse + ambientColor), 1.0);
}
