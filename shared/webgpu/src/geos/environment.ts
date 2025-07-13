import { Transform } from '@shaders-mono/geopro';
import { GeoRenderable } from '../geo-renderable';
import { GeoOptions, GeoGenerator } from '../types';
import { createEnvironmentQuad } from './geo-utils';

/**
 * Options for environment geometry creation
 */
export interface EnvironmentOptions {
  // Environment geometries are fullscreen quads that don't require additional configuration
}

export type EnvironmentGenerator<B> = GeoGenerator<B, EnvironmentOptions>;

/**
 * Specialized GeoRenderable for environment background rendering
 */
class EnvironmentGeoRenderable<T = null> extends GeoRenderable<T> {
  // Override shader selection to use environment shaders
  get vertexShader(): 'vertexEnvironmentShader' {
    return 'vertexEnvironmentShader';
  }
  
  get fragmentShader(): 'fragmentEnvironmentShader' {
    return 'fragmentEnvironmentShader';
  }
}

/**
 * Create a fullscreen environment quad geometry for background rendering.
 * The quad will be rendered behind all other geometry using environment shaders.
 * 
 * @param t - Transform (typically identity for environment mapping)
 * @param options - Geometry creation options
 * @returns EnvironmentGeoRenderable configured for environment rendering
 */
export const environmentGen: EnvironmentGenerator<any> = <B>(
  t: Transform, 
  options: GeoOptions<EnvironmentOptions>
): EnvironmentGeoRenderable<B> => {
  const { id } = options;
  
  // Create fullscreen quad geometry in clip space
  const [coordinates, normals, tangents] = createEnvironmentQuad();
  
  // Transform coordinates to flat arrays
  const vertexArray: number[] = coordinates.map((p) => p.map(t).triplet).flat();
  const normalArray: number[] = normals.map((n) => n.triplet).flat();
  const tangentArray: number[] = tangents.map((t) => t.triplet).flat();
  
  // Create EnvironmentGeoRenderable with triangle-list topology
  const environmentQuad = new EnvironmentGeoRenderable<B>(id, 'triangle-list', options);
  
  // Add vertex data
  environmentQuad.addVertices(new Float32Array(vertexArray));
  environmentQuad.addNormals(new Float32Array(normalArray));
  environmentQuad.addTangents(new Float32Array(tangentArray));
  
  // Configure for environment rendering
  environmentQuad.setCullMode('none'); // Don't cull since it's a fullscreen quad
  
  return environmentQuad;
};

/**
 * Environment geometry generator function
 * @returns Environment generator function
 */
export const environmentQuad = <B = null>(): EnvironmentGenerator<B> => environmentGen;