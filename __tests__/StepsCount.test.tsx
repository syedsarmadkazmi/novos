import { render } from "@testing-library/react-native";
import { StepsCount } from "../src/components";

describe('StepsCount component', () => {
    test('component renders correctly', () => {
      const { getByText } = render(<StepsCount steps={500} />);
      expect(getByText(/Your Current Steps Count:/i)).toBeTruthy();
      expect(getByText(/Daily Goal:/i)).toBeTruthy();
    });
  });