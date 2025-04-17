export {};
declare global {
    interface Window {
        IntegrationBridgeInstance: any;
        _env_: any;
        documentReadCallback: any;
        documentCloseCallback: any;
    }
}
