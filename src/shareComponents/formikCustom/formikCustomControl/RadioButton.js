import { ErrorMessage, Field } from 'formik';
import React from 'react';
import TextError from './TextError';

const Radiobutton = (props) => {
    const {label, name, options, ...rest} = props
    return (
        <div className='form_control'>
            <label>{label}</label>
            <Field name={name} {...rest}>
                {
                  ({field}) => {
                      return options.map(option => {
                          return (
                              <React.Fragment key={option.key}>
                                  <input type='radio' id={option.key} {...field} value={option.value} checked={field.value === option.value}></input>
                                <label htmlFor={option.key}>{option.value}</label>
                              </React.Fragment>
                          )
                      })
                  }
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>
            
        </div>
    );
}

export default Radiobutton;
