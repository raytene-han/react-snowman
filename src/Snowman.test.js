import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";

it("disallows guessing after max guesses reached", function () {
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
  expect(container.querySelectorAll('button').length).toEqual(1);
  expect(container.querySelector('#lose')).toBeInTheDocument();

});



it("changes to correct image after incorrect guess", function () {
  const { container } = render(
    <Snowman
      images={[img0, img2]}
      words={["bet"]}
      maxWrong={2}
    />
  );
  const button = container.querySelector('button[value="a"]');
  fireEvent.click(button);
  const img = container.querySelector('img').getAttribute('src');
  expect(img).toContain("2.png");
  expect(img).not.toContain("0.png");

});


it("changes to correct image after correct guess", function () {
  const { container } = render(
    <Snowman
      images={[img0, img2]}
      words={["bet"]}
      maxWrong={2}
    />
  );
  const button = container.querySelector('button[value="b"]');
  fireEvent.click(button);
  const img = container.querySelector('img').getAttribute('src');
  expect(img).toContain("0.png");
  expect(img).not.toContain("2.png");

});


it("shows correct word and underscores", function () {
  const { container } = render(
    <Snowman
      images={[img0, img2]}
      words={["bet"]}
      maxWrong={2}
    />
  );
  const firstClick = container.querySelector('button[value="b"]');
  fireEvent.click(firstClick);
  const word = container.querySelector('.Snowman-word').innerHTML;
  expect(word).toEqual("b__");

  const secondClick = container.querySelector('button[value="t"]');

  fireEvent.click(secondClick);
  const secondGuess = container.querySelector('.Snowman-word').innerHTML;
  expect(secondGuess).toEqual("b_t");
});




it("renders without crashing", function () {
  render(
    <Snowman
      images={[img0, img1, img2, img3, img4, img5, img6]}
      words={["test"]}
      maxWrong={6}
    />
  );
});


it("matches snapshot", function () {
  const { container } =
    render(
      <Snowman
        images={[img0, img1, img2, img3, img4, img5, img6]}
        words={["test"]}
        maxWrong={6}
      />
    );
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
    );

  const button = container.querySelector('button[value="a"]');
  fireEvent.click(button);

  expect(container).toMatchSnapshot();

});
