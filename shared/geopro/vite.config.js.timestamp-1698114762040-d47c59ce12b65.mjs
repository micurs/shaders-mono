// vite.config.js
import { resolve } from "path";
import { defineConfig } from "file:///Users/micurs/dev/demos/shaders-mono/node_modules/.pnpm/vite@4.4.11_@types+node@20.8.6/node_modules/vite/dist/node/index.js";
import dts from "file:///Users/micurs/dev/demos/shaders-mono/node_modules/.pnpm/vite-plugin-dts@3.6.0_@types+node@20.8.6_typescript@5.0.2_vite@4.4.11/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/micurs/dev/demos/shaders-mono/shared/geopro";
var entryRoot = resolve(__vite_injected_original_dirname, "src/index.ts");
var vite_config_default = defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: entryRoot,
      name: "geopro",
      formats: ["es"],
      fileName: "geopro"
    }
  },
  plugins: [dts({ rollupTypes: true, entryRoot: "src" })]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWljdXJzL2Rldi9kZW1vcy9zaGFkZXJzLW1vbm8vc2hhcmVkL2dlb3Byb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL21pY3Vycy9kZXYvZGVtb3Mvc2hhZGVycy1tb25vL3NoYXJlZC9nZW9wcm8vdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL21pY3Vycy9kZXYvZGVtb3Mvc2hhZGVycy1tb25vL3NoYXJlZC9nZW9wcm8vdml0ZS5jb25maWcuanNcIjsvLyB2aXRlLmNvbmZpZy50c1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvZ3VpZGUvYnVpbGQuaHRtbCNsaWJyYXJ5LW1vZGVcblxuY29uc3QgZW50cnlSb290ID0gcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYnVpbGQ6IHtcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgbGliOiB7XG4gICAgICBlbnRyeTogZW50cnlSb290LFxuICAgICAgbmFtZTogJ2dlb3BybycsXG4gICAgICBmb3JtYXRzOiBbJ2VzJ10sXG4gICAgICBmaWxlTmFtZTogJ2dlb3BybycsXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW2R0cyh7IHJvbGx1cFR5cGVzOiB0cnVlLCBlbnRyeVJvb3Q6ICdzcmMnIH0pXSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsZUFBZTtBQUN4QixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFIaEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTSxZQUFZLFFBQVEsa0NBQVcsY0FBYztBQUVuRCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUEsSUFDWCxLQUFLO0FBQUEsTUFDSCxPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsSUFBSTtBQUFBLE1BQ2QsVUFBVTtBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsSUFBSSxFQUFFLGFBQWEsTUFBTSxXQUFXLE1BQU0sQ0FBQyxDQUFDO0FBQ3hELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
