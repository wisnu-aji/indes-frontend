import Cryptr from "cryptr";

export const { decrypt, encrypt } = new Cryptr(process.env.SECRET!);
