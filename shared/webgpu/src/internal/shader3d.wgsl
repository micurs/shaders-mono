struct TransfornData {
  model: mat4x4<f32>,
  view: mat4x4<f32>,
  projection: mat4x4<f32>,
};

struct Fragment {
  @builtin(position) position: vec4<f32>,
  @location(0) texCoord: vec2<f32>,
}


@binding(0) @group(0) var<uniform> transformData: TransfornData;
@binding(1) @group(0) var myTexture: texture_2d<f32>;
@binding(2) @group(0) var mySampler: sampler;


@vertex
fn vs_main(@location(0) vertexPosition: vec3<f32>, @location(1) vertexTexCoord: vec2<f32>) -> Fragment {
  var output: Fragment;
  output.position = transformData.projection * transformData.view * transformData.model * vec4<f32>(vertexPosition, 1.0);
  output.texCoord = vertexTexCoord;
  return output;
}

@fragment
fn fs_main(@location(0) textCoord: vec2<f32>) -> @location(0) vec4<f32> {
  return textureSample(myTexture, mySampler, textCoord);
}
