// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const ContactForm = () => {
//   const initialValues = {
//     name: '',
//     email: '',
//     message: '',
//   };

//   const validationSchema = Yup.object({
//     name: Yup.string().required('Name is required'),
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     message: Yup.string().min(10, 'Message should be at least 10 characters').required('Message is required'),
//   });

//   const handleSubmit = (values, { resetForm }) => {
//     console.log('Form submitted:', values);
//     // You can send data to backend here
//     resetForm();
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h2>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         <Form className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
//               Name
//             </label>
//             <Field
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Your name"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <ErrorMessage name="name" component="div" className="text-red-600 text-sm mt-1" />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
//               Email
//             </label>
//             <Field
//               type="email"
//               id="email"
//               name="email"
//               placeholder="you@example.com"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
//           </div>

//           <div>
//             <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
//               Message
//             </label>
//             <Field
//               as="textarea"
//               id="message"
//               name="message"
//               rows="4"
//               placeholder="Your message..."
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <ErrorMessage name="message" component="div" className="text-red-600 text-sm mt-1" />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Send Message
//           </button>
//         </Form>
//       </Formik>
//     </div>
//   );
// };

// export default ContactForm;
