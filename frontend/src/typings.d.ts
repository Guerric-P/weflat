/* SystemJS module definition */
declare var module: NodeModule;
declare module "jwt-decode" {
	function decode(token: string): any;
	namespace decode {}
	export = decode;
}
interface NodeModule {
  id: string;
}
