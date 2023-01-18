import { render, fireEvent } from "@testing-library/react";
import Snowman from './Snowman';

/**
 * Use fireEvent to simulate guessing letters
 *
 * @param {} container - HTML that contains letter buttons
 * @param {String} ltrs - Letters to guess
 */

function guessLetters(container, ltrs) {
  for (let ltr of ltrs) {
    const ltrBtn = container.querySelector(`button[value="${ltr}"]`)
    fireEvent.click(ltrBtn);
  }
}

it('renders without crashing', function() {
  render(<Snowman />);
});

it('matches snapshot', function() {
  const { container } = render(<Snowman />);
  expect(container).toMatchSnapshot();
})

it('successfully detects game over', function() {
  const { container } = render(<Snowman words={['z']}/>);

  guessLetters(container, 'abcdefg'); // Guess 7 times

  // Check image is still there
  const img = container.querySelector('.Snowman img');
  expect(container).toContainElement(img);

  // Check buttons are gone
  expect(container.querySelectorAll('.Snowman-ltr-btn').length).toEqual(0);

  // Check for lose message and correct word
  expect(container).toContainHTML('You lose');
  expect(container).toContainHTML('Correct word was: z');
})