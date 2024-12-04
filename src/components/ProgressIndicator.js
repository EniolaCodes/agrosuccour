import React from "react";

const ProgressIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center justify-center w-full">
          {/* Step Indicator */}
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                index <= currentStep ? "bg-green-500" : "bg-gray-300"
              }`}
            ></div>
            <p
              className={`text-sm mt-2 ${
                index <= currentStep ? "text-green-500" : "text-gray-500"
              }`}
            >
              {step}
            </p>
          </div>

          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-1 ${
                index < currentStep ? "bg-green-500" : "bg-gray-300"
              }`}
              style={{
                // marginLeft: "8px",
                // marginRight: "8px",
                alignSelf: "center",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
