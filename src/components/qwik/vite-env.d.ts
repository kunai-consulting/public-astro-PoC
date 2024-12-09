// TODO: figure out why vite isn't getting this type
declare module "*.css?inline" {
	const content: string;
	export default content;
}
