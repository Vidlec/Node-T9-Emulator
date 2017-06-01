import path from "path";

export const CLIENT_DIR = path.resolve(__dirname, "./client/js");
export const babelLoader = {
	test: /\.js$/,
	include: CLIENT_DIR,
	loader: "babel-loader",
};

export const aliases = {
	components: path.resolve(CLIENT_DIR, "components"),
	reducers: path.resolve(CLIENT_DIR, "reducers"),
	actions: path.resolve(CLIENT_DIR, "actions")
};

export const client = {
	name: "client",
	target: "web",
	context: CLIENT_DIR,
	entry: "./main.js",
	output: {
		path: CLIENT_DIR,
		filename: "bundle.js"
	},
	module: {
		loaders: [babelLoader]
	},
	resolve: {
		alias: aliases
	},
	plugins: [
	]
};

export default [client];