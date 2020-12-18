import { Theme, createMuiTheme } from "@material-ui/core";
const DRAWER_MIN_HEIGHT = 100;
export const theme: Theme = createMuiTheme({
	overrides: {
		MuiInputBase: {
			root: {
				flexWrap: "nowrap",
			},
		},
		MuiTypography: {
			root: {
				flexWrap: "wrap",
			},
		},
		MuiCssBaseline: {
			"@global": {
				body: {
					display: "block",
					backgroundColor: "#fff",
					fontSize: 14,
					"@media (max-width: 960px)": {
						fontSize: 12,
					},
				},
				button: {
					color: "inherit",
				},
				a: {
					textDecoration: "none",
					textDecorationColor: "inherit",
					color: "inherit",
				},
				img: {
					maxWidth: "100%",
				},
			},
		},
	},
	palette: {
		primary: { main: "#009E55", dark: "#01473d", light: "#2ba576" },
	},
	mixins: {
		toolbar: {
			minHeight: DRAWER_MIN_HEIGHT,
			"@media (min-width: 600px)": {
				minHeight: DRAWER_MIN_HEIGHT,
			},
			"@media (min-width:0px) and (orientation: landscape)": {
				minHeight: DRAWER_MIN_HEIGHT,
			},
		},
	},
	props: {
		MuiTypography: {
			variantMapping: {
				body1: "div",
				body2: "div",
				// h6: "div",
			},
		},
	},
	typography: {
		fontFamily: "Noto Sans KR",
		h1: {
			fontWeight: 400,
			fontSize: 34,
			letterSpacing: -1.8,
			"@media (max-width: 960px)": {
				fontSize: 24,
				letterSpacing: -0.5,
			},
		},
		h2: {
			fontSize: 20,
			"@media (max-width: 960px)": {
				fontSize: 18,
			},
			fontWeight: 400,
			letterSpacing: -0.75,
			lineHeight: "normal",
		},
		h3: {
			//제목
			fontSize: 18,
			"@media (max-width: 960px)": {
				fontSize: 14,
			},
			lineHeight: "normal",
			letterSpacing: -0.5,
		},
		h4: {
			fontSize: 16,
			"@media (max-width: 960px)": {
				fontSize: 14,
			},
			letterSpacing: -0.6,
			fontWeight: "inherit",
			lineHeight: "normal",
		},
		h5: {
			fontSize: 14,
			"@media (max-width: 960px)": {
				fontSize: 11,
			},
			letterSpacing: -0.3,
			fontWeight: "inherit",
			lineHeight: "normal",
		},
		h6: {
			"@media (max-width: 960px)": {
				fontSize: 10,
			},
			fontSize: 12,
			fontWeight: "inherit",
			lineHeight: "normal",
		},
		body1: {
			fontSize: 14,
			"@media (max-width: 960px)": {
				fontSize: 12,
			},
			letterSpacing: -0.3,
			fontWeight: "inherit",
			lineHeight: "normal",
			display: "flex",
		},
		body2: {
			fontSize: 14,
			"@media (max-width: 960px)": {
				fontSize: 11,
			},
			fontWeight: "inherit",
			display: "flex",
			lineHeight: "normal",
		},
		subtitle1: {
			fontSize: 14,
			"@media (max-width: 960px)": {
				fontSize: 12,
			},
			letterSpacing: -0.38,
			display: "flex",
			lineHeight: "normal",
			fontWeight: "inherit",
		},
		subtitle2: {
			fontSize: 11,
			"@media (max-width: 960px)": {
				fontSize: 8,
			},
			display: "flex",
			lineHeight: "normal",
			fontWeight: "inherit",
		},
		button: {
			fontSize: 14,
			letterSpacing: 0.2,
			display: "flex",
			lineHeight: "normal",
			fontWeight: "inherit",
		},
	},
});
