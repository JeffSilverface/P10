export declare const SenderType: {
    readonly CLIENT: "CLIENT";
    readonly SUPPORT: "SUPPORT";
};
export type SenderType = (typeof SenderType)[keyof typeof SenderType];
export declare const ConversationStatus: {
    readonly OPEN: "OPEN";
    readonly CLOSED: "CLOSED";
};
export type ConversationStatus = (typeof ConversationStatus)[keyof typeof ConversationStatus];
