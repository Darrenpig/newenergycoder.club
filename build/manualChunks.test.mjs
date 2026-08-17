import test from "node:test";
import assert from "node:assert/strict";

import { getManualChunk } from "./manualChunks.js";

test("react-router family stays in react vendor chunk", () => {
  assert.equal(
    getManualChunk("/repo/node_modules/react-router-dom/dist/index.js"),
    "react-vendor",
  );
  assert.equal(
    getManualChunk("/repo/node_modules/react-router/dist/index.js"),
    "react-vendor",
  );
  assert.equal(
    getManualChunk("/repo/node_modules/@remix-run/router/dist/router.js"),
    "react-vendor",
  );
});

test("non-router chunk rules stay unchanged", () => {
  assert.equal(
    getManualChunk("/repo/node_modules/react-dom/client.js"),
    "react-vendor",
  );
  assert.equal(
    getManualChunk("/repo/node_modules/tailwind-merge/dist/bundle-mjs.mjs"),
    "tailwind-merge",
  );
});
