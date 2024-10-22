import { pgTable, json, serial, varchar, boolean } from "drizzle-orm/pg-core";

export const CourseList = pgTable('courseList', {
    id:serial('id').primaryKey(),
    courseId:varchar('courseId').notNull(),
    name:varchar('name').notNull(),
    category:varchar('category').notNull(),
    level:varchar('level').notNull(),
    includeVideo:varchar('includeVideo').notNull().default('Yes'),
    courseOutput:json('courseOutput').notNull(),
    createdBy:varchar('createdBy').notNull(),
    userName:varchar('userName'),
    userProfileImage:varchar('userProfileImage'),
    courseBanner:varchar('courseBanner').default('/placeholder.svg'),
    publish:boolean('publish').default(false)
})