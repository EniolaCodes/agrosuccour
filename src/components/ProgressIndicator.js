const ProgressIndicator = ({ steps, currentStep }) => {
  return (
    <div className="flex progress-mobile w-[300px]">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center w-full">
          {/* Step Indicator */}
          <div className="flex flex-col items-center relative">
            <div
              className={`w-6 h-6 mt-6 rounded-full flex items-center justify-center ${
                index <= currentStep ? "bg-Green500" : "bg-Green500/30"
              }`}
            ></div>
            <p
              className={`text-[10px]  mt-2 ${
                index <= currentStep ? "text-Grey500" : "text-Grey500/30"
              }`}
            >
              {step}
            </p>
          </div>

          {/* Connecting Line */}
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-[2px] -ml-2 -mr-1 bg-gradient-to-r ${
                index <= currentStep
                  ? "from-Green500 to-Green500"
                  : "from-Green500/20 to-Green500/90"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressIndicator;
