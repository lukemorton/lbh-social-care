import { useState } from 'react';
import PropTypes from 'prop-types';
import Router, { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useBeforeunload } from 'react-beforeunload';

import DynamicStep from 'components/DynamicStep/DynamicStep';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import { createSteps, getNextStepPath } from 'utils/steps';
import { getData, saveData } from 'utils/saveData';

const FormWizard = ({
  formPath,
  formSteps,
  onFormSubmit,
  defaultValues = {},
  title,
}) => {
  Router.events.on('routeChangeComplete', () => {
    window.scrollTo(0, 0);
  });
  useBeforeunload(() => "You'll lose your data!");
  const {
    query: { stepId, fromSummary, continueForm },
  } = useRouter();
  const [formData, setFormData] = useState({
    ...defaultValues,
    ...(continueForm ? getData(formPath)?.data : {}),
  });
  const steps = createSteps(formSteps);
  const stepPath = `${formPath}[step]`;
  const step = steps.find(({ id }) => id === stepId);
  if (!step) {
    process.browser && Router.replace(`${formPath}${formSteps[0].id}`);
    return null;
  }
  const currentStepIndex = steps.findIndex(({ id }) => id === step.id);
  const StepComponent = step.component ? step.component : DynamicStep;
  return (
    <div className="govuk-width-container">
      <NextSeo title={`${step.title} - ${title}`} noindex={true} />
      {currentStepIndex !== 0 && step.id !== 'confirmation' && (
        <a className="govuk-back-link" href="#" onClick={() => Router.back()}>
          Back
        </a>
      )}
      <fieldset
        className="govuk-fieldset"
        role="group"
        aria-describedby="step-hint"
      >
        {step.id !== 'confirmation' && (
          <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
            <h1 className="govuk-fieldset__heading">{title}</h1>
          </legend>
        )}
        {step.id !== 'summary' && step.id !== 'confirmation' && (
          <>
            <Breadcrumbs
              data={formData}
              path={formPath}
              steps={formSteps}
              currentStepIndex={currentStepIndex}
            />
            <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
              <h1 className="govuk-fieldset__heading">{step.title}</h1>
            </legend>
          </>
        )}
        <StepComponent
          components={step.components}
          formData={formData}
          formSteps={formSteps}
          formPath={formPath}
          onStepSubmit={(data) => {
            const updatedData = { ...formData, ...data };
            setFormData(updatedData);
            step.onStepSubmit && step.onStepSubmit(updatedData);
            fromSummary
              ? Router.push(stepPath, `${formPath}summary`)
              : Router.push(
                  stepPath,
                  getNextStepPath(
                    currentStepIndex,
                    steps,
                    formPath,
                    updatedData
                  )
                );
          }}
          onSaveAndExit={(data) => {
            const updateSavedData = {
              ...formData,
              ...data,
            };
            saveData(formPath, updateSavedData, step.id);
            Router.push('/');
          }}
          onFormSubmit={onFormSubmit}
        />
      </fieldset>
    </div>
  );
};

FormWizard.propTypes = {
  formPath: PropTypes.string.isRequired,
  formSteps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      component: PropTypes.func,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
  onFormSubmit: PropTypes.func,
  defaultValues: PropTypes.shape({}),
};

export default FormWizard;
