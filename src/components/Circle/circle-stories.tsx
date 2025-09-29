// src/components/Circle/Circle.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Circle from ".";


const meta: Meta<typeof Circle> = {
  title: "Game/Circle",
  component: Circle,
  argTypes: {
    x: { control: { type: "number" } },
    y: { control: { type: "number" } },
    size: { control: { type: "number" } },
    color: { control: { type: "color" } },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Circle>;

export const Default: Story = {
  args: {
    id: 1,
    x: 50,
    y: 50,
    size: 80,
    color: "#ff69b4", // pink
  },
};



export const MultipleCircles: Story = {
  render: () => (
    <div className="relative w-[400px] h-[300px] bg-gray-100">
      <Circle id={1} x={40} y={60} size={60} color="#ff9999" />
      <Circle id={2} x={150} y={100} size={100} color="#99ccff" />
      <Circle id={3} x={250} y={40} size={80} color="#a3e4d7" />
    </div>
  ),
};
