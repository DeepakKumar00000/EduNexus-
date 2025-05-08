import React from "react";

const LearningGridArray = [
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto w-[350px] lg:w-fit grid-cols-1 lg:grid-cols-3 mb-12">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${card.order % 2 === 1
                ? "bg-richblack-700 h-[294px]"
                : "bg-richblack-800 h-[294px]"
              } ${card.order === 3 && "lg:col-start-2"}`}
          >
            <div className="p-8 flex flex-col gap-8">
              <h1 className="text-richblack-5 text-lg">{card.heading}</h1>
              <p className="text-richblack-300 font-medium">
                {card.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;