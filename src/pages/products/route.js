import Products from ".";
import Inventory2Icon from "@mui/icons-material/Inventory2";
export const productRoute = [
  {
    key: "/products",
    Element: Products,
    label: "Products",
    icon: Inventory2Icon,
    children: [],
    visible: true,
    access: "main",
  },
];
