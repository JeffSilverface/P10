"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.10.0",
    "engineVersion": "0edf323efd1d98336f3f0a68684b56f689b900d3",
    "activeProvider": "postgresql",
    "inlineSchema": "// Prisma schema for the chat PoC.\n// Scope: chat only (Conversation, Message). See CLAUDE.md for context.\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nenum SenderType {\n  CLIENT\n  SUPPORT\n}\n\nenum ConversationStatus {\n  OPEN\n  CLOSED\n}\n\nmodel Conversation {\n  id            String             @id @default(uuid())\n  clientId      String\n  reservationId String?\n  initiatedBy   SenderType\n  status        ConversationStatus @default(OPEN)\n  createdAt     DateTime           @default(now())\n  messages      Message[]\n}\n\nmodel Message {\n  id             String       @id @default(uuid())\n  conversationId String\n  conversation   Conversation @relation(fields: [conversationId], references: [id])\n  senderType     SenderType\n  content        String\n  sentAt         DateTime     @default(now())\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Conversation\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"clientId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"reservationId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"initiatedBy\",\"kind\":\"enum\",\"type\":\"SenderType\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"ConversationStatus\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"messages\",\"kind\":\"object\",\"type\":\"Message\",\"relationName\":\"ConversationToMessage\"}],\"dbName\":null,\"schema\":null},\"Message\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"conversationId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"conversation\",\"kind\":\"object\",\"type\":\"Conversation\",\"relationName\":\"ConversationToMessage\"},{\"name\":\"senderType\",\"kind\":\"enum\",\"type\":\"SenderType\"},{\"name\":\"content\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"sentAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null,\"schema\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"orderBy\",\"cursor\",\"conversation\",\"messages\",\"_count\",\"Conversation.findUnique\",\"Conversation.findUniqueOrThrow\",\"Conversation.findFirst\",\"Conversation.findFirstOrThrow\",\"Conversation.findMany\",\"data\",\"Conversation.createOne\",\"Conversation.createMany\",\"Conversation.createManyAndReturn\",\"Conversation.updateOne\",\"Conversation.updateMany\",\"Conversation.updateManyAndReturn\",\"create\",\"update\",\"Conversation.upsertOne\",\"Conversation.deleteOne\",\"Conversation.deleteMany\",\"having\",\"_min\",\"_max\",\"Conversation.groupBy\",\"Conversation.aggregate\",\"Message.findUnique\",\"Message.findUniqueOrThrow\",\"Message.findFirst\",\"Message.findFirstOrThrow\",\"Message.findMany\",\"Message.createOne\",\"Message.createMany\",\"Message.createManyAndReturn\",\"Message.updateOne\",\"Message.updateMany\",\"Message.updateManyAndReturn\",\"Message.upsertOne\",\"Message.deleteOne\",\"Message.deleteMany\",\"Message.groupBy\",\"Message.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"conversationId\",\"SenderType\",\"senderType\",\"content\",\"sentAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"clientId\",\"reservationId\",\"initiatedBy\",\"ConversationStatus\",\"status\",\"createdAt\",\"every\",\"some\",\"none\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"createMany\",\"set\",\"disconnect\",\"delete\",\"connect\",\"updateMany\",\"deleteMany\"]"),
    graph: "dBIgCgQAAE4AICwAAEgAMC0AAAkAEC4AAEgAMC8BAAAAAUABAEkAIUEBAEoAIUIAAEsyIkQAAExEIkVAAE0AIQEAAAABACAJAwAAUAAgLAAATwAwLQAAAwAQLgAATwAwLwEASQAhMAEASQAhMgAASzIiMwEASQAhNEAATQAhAQMAAG4AIAkDAABQACAsAABPADAtAAADABAuAABPADAvAQAAAAEwAQBJACEyAABLMiIzAQBJACE0QABNACEDAAAAAwAgAQAABAAwAgAABQAgAQAAAAMAIAEAAAABACAKBAAATgAgLAAASAAwLQAACQAQLgAASAAwLwEASQAhQAEASQAhQQEASgAhQgAASzIiRAAATEQiRUAATQAhAgQAAG0AIEEAAFkAIAMAAAAJACABAAAKADACAAABACADAAAACQAgAQAACgAwAgAAAQAgAwAAAAkAIAEAAAoAMAIAAAEAIAcEAABsACAvAQAAAAFAAQAAAAFBAQAAAAFCAAAAMgJEAAAARAJFQAAAAAEBCwAADgAgBi8BAAAAAUABAAAAAUEBAAAAAUIAAAAyAkQAAABEAkVAAAAAAQELAAAQADABCwAAEAAwBwQAAF8AIC8BAFQAIUABAFQAIUEBAF0AIUIAAFUyIkQAAF5EIkVAAFYAIQIAAAABACALAAATACAGLwEAVAAhQAEAVAAhQQEAXQAhQgAAVTIiRAAAXkQiRUAAVgAhAgAAAAkAIAsAABUAIAIAAAAJACALAAAVACADAAAAAQAgEgAADgAgEwAAEwAgAQAAAAEAIAEAAAAJACAEBQAAWgAgGAAAXAAgGQAAWwAgQQAAWQAgCSwAAEAAMC0AABwAEC4AAEAAMC8BADYAIUABADYAIUEBAEEAIUIAADcyIkQAAEJEIkVAADgAIQMAAAAJACABAAAbADAXAAAcACADAAAACQAgAQAACgAwAgAAAQAgAQAAAAUAIAEAAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACAGAwAAWAAgLwEAAAABMAEAAAABMgAAADICMwEAAAABNEAAAAABAQsAACQAIAUvAQAAAAEwAQAAAAEyAAAAMgIzAQAAAAE0QAAAAAEBCwAAJgAwAQsAACYAMAYDAABXACAvAQBUACEwAQBUACEyAABVMiIzAQBUACE0QABWACECAAAABQAgCwAAKQAgBS8BAFQAITABAFQAITIAAFUyIjMBAFQAITRAAFYAIQIAAAADACALAAArACACAAAAAwAgCwAAKwAgAwAAAAUAIBIAACQAIBMAACkAIAEAAAAFACABAAAAAwAgAwUAAFEAIBgAAFMAIBkAAFIAIAgsAAA1ADAtAAAyABAuAAA1ADAvAQA2ACEwAQA2ACEyAAA3MiIzAQA2ACE0QAA4ACEDAAAAAwAgAQAAMQAwFwAAMgAgAwAAAAMAIAEAAAQAMAIAAAUAIAgsAAA1ADAtAAAyABAuAAA1ADAvAQA2ACEwAQA2ACEyAAA3MiIzAQA2ACE0QAA4ACEOBQAAOgAgGAAAPwAgGQAAPwAgNQEAAAABNgEAAAAENwEAAAAEOAEAAAABOQEAAAABOgEAAAABOwEAAAABPAEAPgAhPQEAAAABPgEAAAABPwEAAAABBwUAADoAIBgAAD0AIBkAAD0AIDUAAAAyAjYAAAAyCDcAAAAyCDwAADwyIgsFAAA6ACAYAAA7ACAZAAA7ACA1QAAAAAE2QAAAAAQ3QAAAAAQ4QAAAAAE5QAAAAAE6QAAAAAE7QAAAAAE8QAA5ACELBQAAOgAgGAAAOwAgGQAAOwAgNUAAAAABNkAAAAAEN0AAAAAEOEAAAAABOUAAAAABOkAAAAABO0AAAAABPEAAOQAhCDUCAAAAATYCAAAABDcCAAAABDgCAAAAATkCAAAAAToCAAAAATsCAAAAATwCADoAIQg1QAAAAAE2QAAAAAQ3QAAAAAQ4QAAAAAE5QAAAAAE6QAAAAAE7QAAAAAE8QAA7ACEHBQAAOgAgGAAAPQAgGQAAPQAgNQAAADICNgAAADIINwAAADIIPAAAPDIiBDUAAAAyAjYAAAAyCDcAAAAyCDwAAD0yIg4FAAA6ACAYAAA_ACAZAAA_ACA1AQAAAAE2AQAAAAQ3AQAAAAQ4AQAAAAE5AQAAAAE6AQAAAAE7AQAAAAE8AQA-ACE9AQAAAAE-AQAAAAE_AQAAAAELNQEAAAABNgEAAAAENwEAAAAEOAEAAAABOQEAAAABOgEAAAABOwEAAAABPAEAPwAhPQEAAAABPgEAAAABPwEAAAABCSwAAEAAMC0AABwAEC4AAEAAMC8BADYAIUABADYAIUEBAEEAIUIAADcyIkQAAEJEIkVAADgAIQ4FAABGACAYAABHACAZAABHACA1AQAAAAE2AQAAAAU3AQAAAAU4AQAAAAE5AQAAAAE6AQAAAAE7AQAAAAE8AQBFACE9AQAAAAE-AQAAAAE_AQAAAAEHBQAAOgAgGAAARAAgGQAARAAgNQAAAEQCNgAAAEQINwAAAEQIPAAAQ0QiBwUAADoAIBgAAEQAIBkAAEQAIDUAAABEAjYAAABECDcAAABECDwAAENEIgQ1AAAARAI2AAAARAg3AAAARAg8AABERCIOBQAARgAgGAAARwAgGQAARwAgNQEAAAABNgEAAAAFNwEAAAAFOAEAAAABOQEAAAABOgEAAAABOwEAAAABPAEARQAhPQEAAAABPgEAAAABPwEAAAABCDUCAAAAATYCAAAABTcCAAAABTgCAAAAATkCAAAAAToCAAAAATsCAAAAATwCAEYAIQs1AQAAAAE2AQAAAAU3AQAAAAU4AQAAAAE5AQAAAAE6AQAAAAE7AQAAAAE8AQBHACE9AQAAAAE-AQAAAAE_AQAAAAEKBAAATgAgLAAASAAwLQAACQAQLgAASAAwLwEASQAhQAEASQAhQQEASgAhQgAASzIiRAAATEQiRUAATQAhCzUBAAAAATYBAAAABDcBAAAABDgBAAAAATkBAAAAAToBAAAAATsBAAAAATwBAD8AIT0BAAAAAT4BAAAAAT8BAAAAAQs1AQAAAAE2AQAAAAU3AQAAAAU4AQAAAAE5AQAAAAE6AQAAAAE7AQAAAAE8AQBHACE9AQAAAAE-AQAAAAE_AQAAAAEENQAAADICNgAAADIINwAAADIIPAAAPTIiBDUAAABEAjYAAABECDcAAABECDwAAEREIgg1QAAAAAE2QAAAAAQ3QAAAAAQ4QAAAAAE5QAAAAAE6QAAAAAE7QAAAAAE8QAA7ACEDRgAAAwAgRwAAAwAgSAAAAwAgCQMAAFAAICwAAE8AMC0AAAMAEC4AAE8AMC8BAEkAITABAEkAITIAAEsyIjMBAEkAITRAAE0AIQwEAABOACAsAABIADAtAAAJABAuAABIADAvAQBJACFAAQBJACFBAQBKACFCAABLMiJEAABMRCJFQABNACFJAAAJACBKAAAJACAAAAABTgEAAAABAU4AAAAyAgFOQAAAAAEFEgAAcAAgEwAAcwAgSwAAcQAgTAAAcgAgUQAAAQAgAxIAAHAAIEsAAHEAIFEAAAEAIAAAAAABTgEAAAABAU4AAABEAgsSAABgADATAABlADBLAABhADBMAABiADBNAABjACBOAABkADBPAABkADBQAABkADBRAABkADBSAABmADBTAABnADAELwEAAAABMgAAADICMwEAAAABNEAAAAABAgAAAAUAIBIAAGsAIAMAAAAFACASAABrACATAABqACABCwAAbwAwCQMAAFAAICwAAE8AMC0AAAMAEC4AAE8AMC8BAAAAATABAEkAITIAAEsyIjMBAEkAITRAAE0AIQIAAAAFACALAABqACACAAAAaAAgCwAAaQAgCCwAAGcAMC0AAGgAEC4AAGcAMC8BAEkAITABAEkAITIAAEsyIjMBAEkAITRAAE0AIQgsAABnADAtAABoABAuAABnADAvAQBJACEwAQBJACEyAABLMiIzAQBJACE0QABNACEELwEAVAAhMgAAVTIiMwEAVAAhNEAAVgAhBC8BAFQAITIAAFUyIjMBAFQAITRAAFYAIQQvAQAAAAEyAAAAMgIzAQAAAAE0QAAAAAEEEgAAYAAwSwAAYQAwTQAAYwAgUQAAZAAwAAIEAABtACBBAABZACAELwEAAAABMgAAADICMwEAAAABNEAAAAABBi8BAAAAAUABAAAAAUEBAAAAAUIAAAAyAkQAAABEAkVAAAAAAQIAAAABACASAABwACADAAAACQAgEgAAcAAgEwAAdAAgCAAAAAkAIAsAAHQAIC8BAFQAIUABAFQAIUEBAF0AIUIAAFUyIkQAAF5EIkVAAFYAIQYvAQBUACFAAQBUACFBAQBdACFCAABVMiJEAABeRCJFQABWACECBAYCBQADAQMAAQEEBwAAAAADBQAIGAAJGQAKAAAAAwUACBgACRkACgEDAAEBAwABAwUADxgAEBkAEQAAAAMFAA8YABAZABEGAgEHCAEICwEJDAEKDQEMDwENEQQOEgUPFAEQFgQRFwYUGAEVGQEWGgQaHQcbHgscHwIdIAIeIQIfIgIgIwIhJQIiJwQjKAwkKgIlLAQmLQ0nLgIoLwIpMAQqMw4rNBI"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map