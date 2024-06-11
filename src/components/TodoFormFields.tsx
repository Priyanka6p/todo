import React, { useState } from "react";
import { Formik, Field, ErrorMessage, FormikValues, FormikHelpers } from "formik";
import * as Yup from 'yup';
import { FixedSizeList } from "react-window"
import swal from "sweetalert";

interface FormValues {
    todoName: string,
    desc: string,
    status: boolean,
}

const validationSchema = Yup.object().shape({
    todoName: Yup.string().required("This field is required"),
    desc: Yup.string().optional(),
});

const TodoFormFields: React.FC = () => {
    const [data, setData] = useState<FormValues[]>([]);

    const initialValues: FormValues = {
        todoName: '',
        desc: '',
        status: false,
    };

    const handleSubmit = (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
        console.log("Field's values", values);
        resetForm();
        setSubmitting(false);
        setData(prevData => [...prevData, values]);
        // renderRow(values);
        console.log('Form data', data);
    }

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newData = [...data];
        newData[index].status = e.target.checked;
        setData(newData);
        if (e.target.checked) {
            swal("Your task is done");
        } else {
            swal("Your task is pending..");
        }
    }

    const handleDelete = (index: number) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

    const renderRow = ({ index }: { index: number }) => {
        const formData = data[index];
        console.log("Form data: ", formData);
        return (
            <div>
                <input type="checkbox" onChange={(e) => handleCheck(e, index)} checked={formData.status} />
                <span><b>Sr.No.</b>{index+1}</span>
                <p><b>Todo Name:</b> {formData.todoName}</p>
                <p><b>Description:</b> {formData.desc}</p>
                <p><b>Status:</b> {formData.status ? "Completed" : "Incomplete"}</p>
                <button type="button" onClick={() => handleDelete(index)}>Delete Data</button>
                <hr />
            </div>
        );
    };

    return (
        <div>
            <h1>Todo</h1>
            <div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    {({ isSubmitting, errors, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <label>Add Target Name: </label>
                            <Field type="text" name="todoName" />
                            <ErrorMessage name="todoName" component="div" className="error" />
                            <label>Add Target Description: </label>
                            <Field type="text" name="desc" />
                            <ErrorMessage name="desc" component="div" className="error" />
                            <button type="submit" disabled={isSubmitting}>Submit</button>
                        </form>
                    )}
                </Formik>
            </div>
            <div style={{ display: "block", padding: 70 }}>
                <FixedSizeList
                    height={500}
                    width={800}
                    itemSize={100}
                    itemCount={data.length}
                    itemData={FormData}
                >
                    {renderRow}
                </FixedSizeList>
            </div>
        </div>
    );
};

export default TodoFormFields;