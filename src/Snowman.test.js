import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";

it("disallows guessing after max guesses reached", function() {
  const { container } = render(
    <Snowman
      images={[img0, img6]}
      words={["x"]}
      maxWrong={1}
    />
  );

  const button = container.querySelector('button[value="a"]');
  fireEvent.click(button);
  // expect the length of button elements to be 0
  expect(container.querySelectorAll('button').length).toEqual(0)
  expect(container.querySelector('#lose')).toBeInTheDocument();

});




it("renders without crashing", function () {
  render(
    <Snowman
      images={[img0, img1, img2, img3, img4, img5, img6]}
      words={["test"]}
      maxWrong={6}
    />
  )
});


it("matches snapshot", function () {
  const { container } =
  render(
    <Snowman
      images={[img0, img1, img2, img3, img4, img5, img6]}
      words={["test"]}
      maxWrong={6}
    />
  )
  expect(container).toMatchSnapshot();

});

it("matches snapshot for losing", function () {
  const { container } =
  render(
    <Snowman
      images={[img0, img6]}
      words={["x"]}
      maxWrong={1}
    />
  )

  const button = container.querySelector('button[value="a"]');
  fireEvent.click(button);

  expect(container).toMatchSnapshot();

});
