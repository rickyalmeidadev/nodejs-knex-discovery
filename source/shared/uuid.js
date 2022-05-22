import crypto from "node:crypto";

const uuid = () => crypto.randomUUID();

export default uuid;
