const MAX_DIR_LIGHTS: u32 = 4;
const MAX_POINT_LIGHTS: u32 = 4;
const PI = 3.1415926535897932384626433832795;

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
  numDirLights: u32,
  numPointLights: u32,
};

struct ObjectData {
  model: mat4x4<f32>,
};

struct TextFragment {
  @builtin(position) position: vec4<f32>,
  @location(0) texCoord: vec2<f32>,
  @location(1) normal: vec3<f32>,
  @location(2) tangent: vec3<f32>,
  @location(3) pos: vec3<f32>,
  @location(4) eye: vec3<f32>,
  @location(5) viewZ: f32,
  // @location(5) worldTangent: vec3<f32>,
};

struct ColorFragment {
  @builtin(position) position: vec4<f32>,
  @location(0) normal: vec3<f32>,
  @location(1) tangent: vec3<f32>,
  @location(2) pos: vec3<f32>,
  @location(3) eye: vec3<f32>,
  @location(4) viewZ: f32,
};

struct ColorLineFragment {
  @builtin(position) position: vec4<f32>,
  @location(0) viewZ: f32,
  @location(1) targetZ: f32,
  @location(2) color: vec4<f32>,
};

struct ColorData {
    color: vec4<f32>,
};

struct MaterialProperties {
    alpha: f32,
    bumpIntensity: f32,
    bumpPrecision: f32, // Precision for bump mapping
};



@group(0) @binding(0) var<uniform> sceneData: SceneData;
@group(0) @binding(1) var<uniform> sceneLights: SceneLights;
@group(1) @binding(0) var<uniform> myColor: ColorData;
@group(1) @binding(1) var<uniform> materialProperties: MaterialProperties;
@group(2) @binding(0) var<uniform> myModel: ModelData;
@group(3) @binding(0) var myTexture0: texture_2d<f32>;
@group(3) @binding(1) var myTexture1: texture_2d<f32>;
@group(3) @binding(2) var myTexture2: texture_2d<f32>;
@group(3) @binding(3) var myTexture3: texture_2d<f32>;
@group(3) @binding(4) var mySampler: sampler;
@group(3) @binding(5) var environmentTexture: texture_2d<f32>;
@group(3) @binding(6) var environmentSampler: sampler;

/**
  * Computes the diffuse color for a given point in the scene.
  *
  * @param eye The position of the camera.
  * @param pos The position of the point in the scene.
  * @param normal The normal of the point in the scene.
  * @param sceneLights The lights in the scene.
  * @return The diffuse color for the point.
  */
fn computeDiffuseColor(
    eye: vec3<f32>,
    pos: vec3<f32>,
    normal: vec3<f32>,
    sceneLights: SceneLights) -> vec3<f32> {
  var diffuse: vec3<f32> = sceneLights.ambient.rgb;
  for (var i: u32 = 0; i < sceneLights.numDirLights; i = i + 1) {
    if (sceneLights.dirLights[i].col.a == 0.0) {
      continue;
    }
    let lightDir: vec3<f32> = -normalize(sceneLights.dirLights[i].dir.xyz); //
    let lightColor: vec3<f32> = sceneLights.dirLights[i].col.rgb;
    var NdotL: f32 = max(dot(normal, lightDir), 0);
    let diffuseColor = NdotL * lightColor * sceneLights.dirLights[i].col.a; // Multiply by intensity

    diffuse = diffuse + diffuseColor;
  }
  for (var i: u32 = 0; i < sceneLights.numPointLights; i = i + 1) {
    if (sceneLights.pointLights[i].col.a == 0.0) {
        continue;
    }
    let dir = sceneLights.pointLights[i].pos.xyz - pos;
    let dist = length(dir);
    let attenuationRadius: f32 = 50.0; // Fixed attenuation radius
    let attenuation = 1.0 - clamp(pow( dist / attenuationRadius, 2.0), 0.0, 1.0 );

    let lightDir: vec3<f32> = normalize(dir);
    let lightColor: vec3<f32> = sceneLights.pointLights[i].col.rgb;
    var NdotL: f32 = max(dot(normal, lightDir), 0.0);
    let diffuseColor = NdotL * lightColor * sceneLights.pointLights[i].col.a; // Multiply by intensity

    diffuse = diffuse + diffuseColor * attenuation;
  }
  return clamp(diffuse, vec3<f32>(0, 0, 0), vec3<f32>(1.0, 1.0, 1.0));
}

/**
  * Computes the diffuse color for a given point in the scene.
  *
  * @param eye The position of the camera.
  * @param pos The position of the point in the scene.
  * @param normal The normal of the point in the scene.
  * @param sceneLights The lights in the scene.
  * @return The diffuse color for the point.
  */
fn computeSpecularColor(
    eye: vec3<f32>,
    pos: vec3<f32>,
    normal: vec3<f32>,
    sceneLights: SceneLights,
    surfaceColor: vec4<f32>
    ) -> vec3<f32> {
  var shininess: f32 = 12.0; // 92.0;
  var specular: vec3<f32> = vec3<f32>(0, 0, 0);
  let V = normalize(eye - pos); // Moved outside the loop
  for (var i: u32 = 0; i < sceneLights.numPointLights; i = i + 1) {
    if (sceneLights.pointLights[i].col.a == 0.0) {
      continue;
    }
    let intensity = sceneLights.pointLights[i].col.a; // Renamed 'power' to 'intensity' for clarity
    let dir = sceneLights.pointLights[i].pos.xyz - pos;
    let dist = length(dir);
    let attenuationRadius: f32 = 50.0; // Consistent with diffuse
    let attenuation = 1.0 - clamp(pow( dist / attenuationRadius, 2.0), 0.0, 1.0 );

    let lightDir: vec3<f32> = normalize(dir);
    let lightColor: vec3<f32> = sceneLights.pointLights[i].col.rgb;

    // Specular
    let R = normalize(reflect(-lightDir, normal));
    let specularIntensity = pow(max(dot(V, R), 0.0), shininess);
    let specularColor = specularIntensity * lightColor * intensity; // Multiply by intensity

    specular = specular + specularColor * attenuation;
  }

  return clamp(specular, vec3<f32>(0, 0, 0), vec3<f32>(1.0, 1.0, 1.0));
}


/**
  * Computes the distance from a point to a segment.
  *
  * @param point The point.
  * @param segmentStart The start of the segment.
  * @param segmentEnd The end of the segment.
  * @return The distance from the point to the segment.
  */
fn computeDistanceToSegment( point: vec3<f32>, segmentStart: vec3<f32>, segmentEnd: vec3<f32> ) -> f32 {
  let segment = segmentEnd - segmentStart;
  let segmentLength = length(segment);
  let segmentDirection = segment / segmentLength;
  let pointToStart = point - segmentStart;
  let projection = dot(pointToStart, segmentDirection);
  if (projection < 0.0) {
    return length(pointToStart);
  }
  if (projection > segmentLength) {
    return length(point - segmentEnd);
  }
  return length(pointToStart - projection * segmentDirection);
}

/**
 * Computes an attenuation factor based on the distance from the camera.
 * The attenuation is 1.0 for distances less than 50 units, and then
 * linearly decreases for distances between 50 and 850 units.
 *
 * @param d The distance from the camera.
 * @return The attenuation factor (0.0 to 1.0).
 */
fn computeDistanceToCameraAttenuation( d: f32 ) -> f32 {
  if ( d< 50 ) {
    return 1.0;
  }
  return 1 - clamp((d-49)/800 , 0.0, 1.0);
}

/**
 * Samples the environment texture using spherical projection.
 * Converts a 3D world direction vector to equirectangular texture coordinates
 * and samples the environment texture at infinite distance.
 *
 * @param worldDirection The 3D direction vector in world space
 * @return The environment color at the given direction
 */
fn sampleEnvironment(worldDirection: vec3<f32>) -> vec4<f32> {
  let dir = normalize(worldDirection);
  
  // Convert to spherical coordinates
  let phi = atan2(dir.z, dir.x);
  let theta = acos(dir.y);
  
  // Convert to equirectangular UV coordinates
  let u = (phi + PI) / (2.0 * PI);
  let v = theta / PI;
  
  return textureSample(environmentTexture, environmentSampler, vec2<f32>(u, v));
}

/**
 * Computes a normal perturbation vector for a grid-like bump effect.
 * This function simulates a grid pattern by perturbing the normal based on
 * the texture coordinates and predefined thickness and tilt values.
 *
 * @param stepU The step size for the U texture coordinate.
 * @param stepV The step size for the V texture coordinate.
 * @param tc The 2D texture coordinates (UV).
 * @param T The tangent vector of the surface.
 * @param B The bitangent vector of the surface.
 * @return The normal perturbation vector in tangent space.
 */
fn bumpGrid(stepU: f32, stepV: f32, tc: vec2<f32>, T: vec3<f32>, B: vec3<f32>  ) -> vec3<f32> {
  var ND = vec3<f32>(0,0,0);
  let tileDimU: f32 = 100.0 / stepU;
  let tileDimV: f32 = 100.0 / stepV;
  let normalTilt = 0.2;
  let tickness: f32 = 0.1;
  let uGrid =  (tc[0]*100 + tickness) % tileDimU;
  let vGrid =  (tc[1]*100 + tickness) % tileDimV;

  if ( uGrid < tickness ) {
    ND =  B * normalTilt;
  }
  else if ( uGrid < tickness * 2 ) {
    ND =  B * normalTilt * -1;
  }
  if ( vGrid < tickness ) {
    ND =  ND + T * normalTilt;
  }
  else if ( vGrid < tickness * 2 ) {
    ND =  ND + T * normalTilt * -1;
  }
  return ND;
}

/**
 * Computes a normal perturbation vector for a wave-like bump effect.
 * This function generates a wave pattern based on sine functions applied
 * to the texture coordinates, with configurable amplitude, frequency, and phase.
 *
 * @param tc The 2D texture coordinates (UV).
 * @param T The tangent vector of the surface.
 * @param B The bitangent vector of the surface.
 * @return The normal perturbation vector in tangent space.
 */
fn bumpWave(tc: vec2<f32>, T: vec3<f32>, B: vec3<f32>  ) -> vec3<f32> {
  // Constants for wave calculations
  let waveAmplitude1: f32 = 0.15;
  let waveFrequency1: f32 = PI * 90.0;
  let wavePhase1: f32 = 0.5;

  let waveAmplitude2: f32 = 0.05;
  let waveFrequency2: f32 = PI * 40.0;
  let wavePhase2: f32 = 1.0;

  let time: f32 = 0.0;

  // Calculate two sets of waves using both U and V texture coordinates
  let wave1U = waveAmplitude1 * sin(tc.x * waveFrequency1 + time + wavePhase1);
  let wave1V = waveAmplitude1 * cos(tc.y * waveFrequency1 + time + wavePhase1);

  let wave2U = waveAmplitude2 * sin(tc.x * waveFrequency2 + time + wavePhase2);
  let wave2V = waveAmplitude2 * cos((tc.y+tc.x) * waveFrequency2 + time + wavePhase2);

  // Combine the wave components to get the overall wave vector in the tangent space
  // let waveVector = vec2<f32>(wave1U + wave2U, wave1V + wave2V);

  return T * (wave1U + wave2U);

  // const step = PI * 10;
  // let delta = (
  //   sin(tc[0] * step)
  //   // (sin(tc[1] * 314) * 0.1)
  // ) * 0.3; // + sin(tc[1]*220.0) * 0.5;
  // return T * delta;
}

// ----------------------------------------------------------------------------------------------- Texture Shaders

@vertex
fn vertexTextureShader(
    @location(0) vertexPosition: vec3<f32>,
    @location(1) vertexNormal: vec3<f32>,
    @location(2) vertexTangent: vec3<f32>,
    @location(3) vertexTexCoord: vec2<f32>) -> TextFragment {
  var output: TextFragment;
  var vertex = myModel.model * vec4<f32>(vertexPosition, 1.0);
  var positionInViewSpace = sceneData.view * vertex;

  output.position = sceneData.projection * sceneData.view * vertex;
  output.texCoord = vec2<f32>(vertexTexCoord);
  output.normal = normalize((myModel.modelInverseTranspose * vec4<f32>(vertexNormal, 0.0)).xyz);
  output.tangent = normalize((myModel.modelInverseTranspose * vec4<f32>(vertexTangent, 0.0)).xyz);
  output.pos = vertex.xyz;
  output.eye = sceneData.invertView[3].xyz;
  output.viewZ = -positionInViewSpace.z;
  // output.worldTangent = normalize((modelMatrix * vec4(input.tangent, 0.0)).xyz);

  return output;
}

@fragment
fn fragmentTextureShader(in: TextFragment) -> @location(0) vec4<f32> {
  var N = normalize(in.normal);
  let T = normalize(in.tangent);
  let B = normalize(cross(N, T));
  var texColor: vec4<f32> = textureSample(myTexture0, mySampler, in.texCoord);
  let att: f32 = computeDistanceToCameraAttenuation(in.viewZ);

  // Normal mapping happen here
  // let ND = bumpGrid(6, in.texCoord, T, B);
  // let ND = bumpGrid(36, 18, in.texCoord, T, B);
  // N = normalize(N + ND);

  let diffuse: vec3<f32> = computeDiffuseColor( in.eye, in.pos, N, sceneLights );
  let specular: vec3<f32> = computeSpecularColor( in.eye, in.pos, N, sceneLights, texColor );

  let textMix = vec4<f32>(1.0 - materialProperties.alpha);
  let finalColor = mix(texColor, myColor.color, textMix); // mixed the two colors based on alpha.
  return clamp(
    vec4<f32>((finalColor.rgb * diffuse + specular) * att, max(finalColor.a, texColor.a)),
    vec4<f32>(0, 0, 0, 0.0), vec4<f32>(1.0, 1.0, 1.0, 1.0)
  );
}

@fragment
fn fragmentTextureBumpShader(in: TextFragment) -> @location(0) vec4<f32> {
  let texColor: vec4<f32> = textureSample(myTexture0, mySampler, in.texCoord);

  // Sample the bump map (just 1 channel since is a grayscale image)
  let heightCenter = textureSample(myTexture1, mySampler, in.texCoord).r;

  // Calculate the gradient of the height field
  let gradPrecision: f32 = materialProperties.bumpPrecision;
  let textDim = textureDimensions(myTexture1, 0);
  let texelSize = vec2<f32>(1.0 / f32(textDim.x), 1.0/ f32(textDim.y) ); // Assuming mip level 0
  let texelStartX = vec2<f32>(texelSize.x * gradPrecision, 0.0);
  let texelStartY = vec2<f32>(0.0, texelSize.y * gradPrecision);
  let heightLeft = textureSample(myTexture1, mySampler, in.texCoord - texelStartX);
  let heightRight = textureSample(myTexture1, mySampler, in.texCoord + texelStartX);
  let heightUp = textureSample(myTexture1, mySampler, in.texCoord + texelStartY);
  let heightDown = textureSample(myTexture1, mySampler, in.texCoord - texelStartY);

  let heightLeftVal = heightLeft.r + heightLeft.g + heightLeft.b;
  let heightRightVal = heightRight.r + heightRight.g + heightRight.b;
  let heightUpVal = heightUp.r + heightUp.g + heightUp.b;
  let heightDownVal = heightDown.r + heightDown.g + heightDown.b;


  // Gradient components
  let dU = (heightRightVal - heightLeftVal) / (  gradPrecision * gradPrecision * texelSize.x);
  let dV = (heightUpVal - heightDownVal) / ( gradPrecision * gradPrecision * texelSize.y) ;

  let gradientVector = vec3<f32>(dU* materialProperties.bumpIntensity, dV * materialProperties.bumpIntensity, 0.0);
  let N = normalize(in.normal);
  let T = normalize(in.tangent);
  let B = cross(N, T);
  let tangentSpaceNormal = vec3<f32>(gradientVector.x, gradientVector.y, 1.0);
  let newNormal = normalize(T * tangentSpaceNormal.x + B * tangentSpaceNormal.y + N * tangentSpaceNormal.z);
  let diffuse: vec3<f32> = computeDiffuseColor( in.eye, in.pos, newNormal, sceneLights );
  let specular: vec3<f32> = computeSpecularColor( in.eye, in.pos, newNormal, sceneLights, texColor );

  let att: f32 = computeDistanceToCameraAttenuation(in.viewZ);

  let textMix = vec4<f32>(1.0 - materialProperties.alpha);
  let finalColor = mix(texColor, myColor.color, textMix); // mixed the two colors based on alpha.
  return clamp(
    vec4<f32>((finalColor.rgb * diffuse + specular) * att, max(finalColor.a, texColor.a)),
    vec4<f32>(0, 0, 0, 0.0), vec4<f32>(1.0, 1.0, 1.0, 1.0)
  );
}


// ----------------------------------------------------------------------------------------------- Environment Shaders

struct EnvironmentFragment {
  @builtin(position) position: vec4<f32>,
  @location(0) worldDirection: vec3<f32>,
};

@vertex
fn vertexEnvironmentShader(
    @location(0) vertexPosition: vec3<f32>) -> EnvironmentFragment {
  var output: EnvironmentFragment;
  
  // Render fullscreen quad at far plane but inside NDC
  output.position = vec4<f32>(vertexPosition.xy, 0.999999, 1.0);
  
  // Convert clip space position to world direction
  // Inverse projection to get view space direction
  let invProj = vec4<f32>(vertexPosition.xy, 1.0, 1.0);
  let viewDir = vec4<f32>(invProj.xy / vec2<f32>(sceneData.projection[0][0], sceneData.projection[1][1]), -1.0, 0.0);
  
  // Transform to world space using inverse view matrix
  output.worldDirection = (sceneData.invertView * viewDir).xyz;
  
  return output;
}

@fragment
fn fragmentEnvironmentShader(in: EnvironmentFragment) -> @location(0) vec4<f32> {
  return sampleEnvironment(normalize(in.worldDirection));
}

// ----------------------------------------------------------------------------------------------- Color Shaders

@vertex
fn vertexColorShader(
    @location(0) vertexPosition: vec3<f32>,
    @location(1) vertexNormal: vec3<f32>,
    @location(2) vertexTangent: vec3<f32>,
    ) -> ColorFragment {
  var output: ColorFragment;
  var vertex = myModel.model * vec4<f32>(vertexPosition, 1.0);
  var positionInViewSpace = sceneData.view * vertex;
  var bias = 0.002 * positionInViewSpace.z;

  var biasedPositionInViewSpace = positionInViewSpace - vec4<f32>(0.0, 0.0, bias, 0.0);

  output.normal = normalize((myModel.modelInverseTranspose * vec4<f32>(vertexNormal, 0.0)).xyz);
  output.tangent = normalize((myModel.modelInverseTranspose * vec4<f32>(vertexTangent, 0.0)).xyz);
  output.position = sceneData.projection * sceneData.view * vertex;
  output.pos = vertex.xyz;
  output.eye = sceneData.invertView[3].xyz;
  output.viewZ = -biasedPositionInViewSpace.z;

  return output;
}

@fragment
fn fragmentColorShader(in: ColorFragment) -> @location(0) vec4<f32> {
  var N = normalize(in.normal);
  let T = normalize(in.tangent);
  let B = normalize(cross(N, T));

  let att: f32 =  computeDistanceToCameraAttenuation(in.viewZ);

  // Compute a normal delta based on a 10x10 grid
  // let ND = bumpGrid(6, in.texCoord, T, B);
  // N = normalize(N + ND);

  let diffuse: vec3<f32> = computeDiffuseColor( in.eye, in.pos, N, sceneLights );
  let specular: vec3<f32> = computeSpecularColor( in.eye, in.pos, N, sceneLights, myColor.color );

  return clamp(
    vec4<f32>((myColor.color.rgb * diffuse.rgb + specular) * att, myColor.color.a),
    vec4<f32>(0, 0, 0, 0.0), vec4<f32>(1.0, 1.0, 1.0, 1.0)
  );

}


@vertex
fn vertexLineShader(
  @location(0) vertexPosition: vec3<f32>,
  @location(1) vertexColor: vec4<f32>
) -> ColorLineFragment {
  var output: ColorLineFragment;
  var vertex = myModel.model * vec4<f32>(vertexPosition, 1.0);

  let eye  = vec4<f32>(sceneData.invertView[3].xyz, 1.0);

  let eyeInViewSpace = sceneData.view * eye;
  let positionInViewSpace = sceneData.view * vertex;
  let bias = 0.002 * positionInViewSpace.z;
  let biasedPositionInViewSpace = positionInViewSpace - vec4<f32>(0.0, 0.0, bias, 0.0);
  output.viewZ = -biasedPositionInViewSpace.z;
  output.targetZ = -eyeInViewSpace.z;
  output.position = sceneData.projection * biasedPositionInViewSpace;
  output.color = vertexColor;

  return output;
}


@fragment
fn fragmentLineShader(in: ColorLineFragment) -> @location(0) vec4<f32> {
  let att: f32 = computeDistanceToCameraAttenuation(in.viewZ);

  return vec4<f32>(in.color.rgb * att, in.color.a * att);
}
