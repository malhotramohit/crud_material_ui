import gql from 'graphql-tag';

export const GetQuery = gql`
query{
    students{
      student_id
      dob
      gender 
      section
      student_email
      student_name
      subjects
    }
  }
`;

export const GetQueryById = gql`
    query($sid:Int!){
        students(where: {student_id: {_eq: $sid}}) {
        student_id
        dob
        gender
        section
        student_email
        student_name
        subjects
        }
    }  
`

export const AddMutation = gql`
            
        mutation($object: [students_insert_input!]!){
            insert_students(objects: $object){
            affected_rows
            }
        }
`;

export const UpdateMutation = gql`

mutation updatemutation($set: students_set_input!, $where : students_bool_exp!){
    update_students(_set: $set, where: $where){
      affected_rows
    }
  }  
`;

export const DeleteMutation = gql`
mutation ($where : students_bool_exp!) {
    delete_students(where: $where){
      affected_rows
      returning{
        student_id
      }
    }
  }
  `;