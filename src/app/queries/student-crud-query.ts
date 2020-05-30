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

export const AddMutation = gql`
            
        mutation($object: [students_insert_input!]!){
            insert_students(objects: $object){
            affected_rows
            }
        }
`;

export const UpdateMutation = gql `
mutation updateMutation($where: todo_list_bool_exp!, $set: todo_list_set_input!) {
    update_todo_list(
      where: $where,
      _set: $set
    ) {
      affected_rows
      returning {
        id
        is_completed
        text
      }
    }
  }`;

  export const DeleteMutation = gql `
  mutation DeleteMutation($where: todo_list_bool_exp!) {
      delete_todo_list(
        where: $where
      ) {
        affected_rows
        returning {
          id
        }
      }
    }`;