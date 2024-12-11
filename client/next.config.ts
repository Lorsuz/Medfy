/** @type {import('next').NextConfig} */

import type { NextConfig } from "next";
import path from 'path';
import * as sass from 'sass';

const nextConfig: NextConfig = {};

export default {
	compiler: {
		styledComponents: true,
	},
	images: {
		domains: [ 'ui-avatars.com' ]
	},
	...nextConfig,
	sassOptions: {
		includePaths: [ path.resolve( process.cwd(), 'public', 'styles' ) ],
		implementation: sass
	}
};

