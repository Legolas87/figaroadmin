import CourseModel from '../../models/CourseModel';

// @flow

class LocalApi {
  static getCourse():CourseModel {
    const course: CourseModel = new CourseModel();
    course.name = 'asasas';
    return course;
  }
}

export default LocalApi;
