import React, { useEffect, useState } from "react";
import QuoteApp from "./DragAndDrop/SortDrag";
// import SortDrag from "./DragAndDrop/SortDrag";
import Navigations from "./EccomerceShop/Navigations";

// "proxy": "http://localhost:9000",

const App = () => {
  const [cnic, setCnic] = useState("12345678912345");
  const [val, setVal] = useState("");
  const [result, setResult] = useState();
  let data = [1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 0, 2, 8];

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   let cnicNum = val.split("-").join(""); // remove hyphens
  //   if (cnicNum.length > 0) {
  //     cnicNum = cnicNum.match(new RegExp(/\d{5}-\d{7}-\d/)).join("-");
  //     // cnicNum = cnicNum.match(new RegExp(".{1,4}", "g")).join("-");
  //     setResult(cnicNum);
  //   }
  // };

  const handleClick = (e) => {
    e.preventDefault();

    let f_val = val.replace(/\D[^\.]/g, "");

    f_val =
      f_val.slice(0, 5) + "-" + f_val.slice(5, 12) + "-" + f_val.slice(12, 14);

    setResult(f_val);
  };

  // let cnicNum = cnic.split("-").join(""); // remove hyphens
  // if (cnicNum.length > 0) {
  //   cnicNum = cnicNum.match(new RegExp(".{1,4}", "g")).join("-");
  //   console.log(cnicNum);
  //   return cnicNum;
  // }

  // let del = data.splice(2, 0, "_");
  // console.log(data);
  // console.log(del);

  return <Navigations />;

  // return (
  //   <div>
  //     <p>{result}</p>
  //     <form onSubmit={handleClick}>
  //       <input
  //         placeholder="cnic Number"
  //         value={val}
  //         onChange={(e) => setVal(e.target.value)}
  //       />
  //     </form>
  //     <button onClick={handleClick}>Click me</button>
  //   </div>
  // );
  // return <QuoteApp />;
};

export default App;

// import "./App.css";
// import { motion, Variants } from "framer-motion";

// const cardVariants = {
//   offscreen: {
//     x: 300,
//   },
//   onscreen: {
//     x: 70,
//     rotate: -10,
//     transition: {
//       type: "spring",
//       bounce: 0.4,
//       duration: 0.8,
//     },
//   },
// };

// const hue = (h) => `hsl(${h}, 100%, 50%)`;

// function Card({ emoji, hueA, hueB }) {
//   const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;

//   return (
//     <motion.div
//       className="card-container"
//       initial="offscreen"
//       whileInView="onscreen"
//       viewport={{ once: true, amount: 0.8 }}
//     >
//       <div className="splash" style={{ background }} />
//       <motion.div className="card" variants={cardVariants}>
//         {emoji}
//       </motion.div>
//     </motion.div>
//   );
// }

// const food = [
//   ["🍅", 340, 10],
//   ["🍊", 20, 40],
//   ["🍋", 60, 90],
//   ["🍐", 80, 120],
//   ["🍏", 100, 140],
//   ["🫐", 205, 245],
//   ["🍆", 260, 290],
//   ["🍇", 290, 320],
// ];

// export default function App() {
//   return food.map(([emoji, hueA, hueB]) => (
//     <Card emoji={emoji} hueA={hueA} hueB={hueB} key={emoji} />
//   ));
// }
