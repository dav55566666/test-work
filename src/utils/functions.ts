

interface HandleSubmitParams {
  requiredFields?: Record<string, any>;
  body: Record<string, any>;
}

export const formValidation = async ({
  requiredFields,
  body,
}: HandleSubmitParams): Promise<Record<string, any>> => {
  if (requiredFields) {
    let formIsValid = true;
    let updatedRequiredFields = { ...requiredFields };

    for (const key of Object.keys(updatedRequiredFields)) {
      const value = body[key];

      if (updatedRequiredFields[key].required) {
        updatedRequiredFields = validateInput({
          validate: key,
          value,
          requiredFields: updatedRequiredFields,
        });
      }

      requiredFields = { ...updatedRequiredFields };

      if (!updatedRequiredFields[key].error) {
        formIsValid = false;
      }
    }

    return {formIsValid, requiredFields};
  }

  return {formIsValid: false, requiredFields};
};

interface ValidateInputParams {
  validate: string;
  value: any;
  requiredFields: Record<string, any>;
}

export const validateInput = ({
  validate,
  value,
  requiredFields,
}: ValidateInputParams): Record<string, any> => {
  if (requiredFields) {
    const field = requiredFields[validate];

    if (!value) {
      return {
        ...requiredFields,
        [validate]: {
          ...field,
          error: !field.required,
        },
      };
    }

    const stringValue = String(value);

    switch (field.type) {
      case 'fixedLength': {
        const numericValue = stringValue.replace(/\D/g, '');
        return {
          ...requiredFields,
          [validate]: {
            ...field,
            error: numericValue.length === field.length,
          },
        };
      }

      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(stringValue);
        return {
          ...requiredFields,
          [validate]: {
            ...field,
            error: isValidEmail,
          },
        };
      }

      case 'password': {
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        const isValidPassword = passwordRegex.test(stringValue);
        return {
          ...requiredFields,
          [validate]: {
            ...field,
            error: isValidPassword,
          },
        };
      }

      case 'limit': {
        const isValidLimit = stringValue.length < field.maxLength;
        return {
          ...requiredFields,
          [validate]: {
            ...field,
            error: isValidLimit,
          },
        };
      }

      case 'location': {
        const emptyFields =
          field.requiredFieldsArray?.filter(
            (key: string) => value[key] !== 0 && !value[key]
          ) || [];
        return {
          ...requiredFields,
          [validate]: {
            ...field,
            error: emptyFields.length === 0,
          },
        };
      }

      case 'array': {
        const isValidArray = Array.isArray(value) && value.length > 0;
        return {
          ...requiredFields,
          [validate]: {
            ...field,
            error: isValidArray,
          },
        };
      }

      default: {
        return {
          ...requiredFields,
          [validate]: {
            ...field,
            error: stringValue !== '',
          },
        };
      }
    }
  }

  return requiredFields;
};