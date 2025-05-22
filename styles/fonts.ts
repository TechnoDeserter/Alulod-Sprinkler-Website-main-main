import {
  Inter,
  Julius_Sans_One,
  Outfit,
  Lekton,
  Poppins,
  Montserrat,
} from "next/font/google";

const juliusSansOneFont = Julius_Sans_One({
  weight: "400",
  subsets: ["latin"],
});
export const jsoFont = juliusSansOneFont.className;
const interFontClass = Inter({ subsets: ["latin"] });
export const interFont = interFontClass.className;

const outfitFontClass = Outfit({ subsets: ["latin"] });
export const outfitFont = outfitFontClass.className;

const lektonFontClass = Lekton({ weight: ["400", "700"], subsets: ["latin"] });
export const lektonFont = lektonFontClass.className;

const poppinsFontClass = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export const poppinsFont = poppinsFontClass.className;

const montserratFontClass = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export const montserratFont = montserratFontClass.className;
