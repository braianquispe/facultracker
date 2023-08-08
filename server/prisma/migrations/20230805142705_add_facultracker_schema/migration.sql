-- CreateTable
CREATE TABLE `Profile` (
    `profileId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(35) NOT NULL,
    `lastName` VARCHAR(35) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`profileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `profileId` INTEGER NOT NULL AUTO_INCREMENT,
    `degreeCourseId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`profileId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `School` (
    `schoolId` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(35) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `School_code_key`(`code`),
    PRIMARY KEY (`schoolId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SchoolType` (
    `schoolTypeId` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(35) NOT NULL,
    `name` VARCHAR(128) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `SchoolType_code_key`(`code`),
    PRIMARY KEY (`schoolTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Institution` (
    `institutionId` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `schoolId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Institution_code_key`(`code`),
    PRIMARY KEY (`institutionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InstitutionType` (
    `institutionTypeId` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(35) NOT NULL,
    `name` VARCHAR(128) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`institutionTypeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Degree` (
    `degreeId` INTEGER NOT NULL AUTO_INCREMENT,
    `resolution` VARCHAR(64) NOT NULL,
    `degreeLevelId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Degree_resolution_key`(`resolution`),
    PRIMARY KEY (`degreeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DegreeLevel` (
    `degreeLevelId` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(35) NOT NULL,
    `name` VARCHAR(128) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`degreeLevelId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subject` (
    `subjectId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `degreeId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`subjectId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubjectState` (
    `subjectStateId` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(35) NOT NULL,
    `name` VARCHAR(128) NOT NULL,

    UNIQUE INDEX `SubjectState_code_key`(`code`),
    PRIMARY KEY (`subjectStateId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DegreeCourse` (
    `degreeCourseId` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `degreeId` INTEGER NOT NULL,
    `degreeCourseStateId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `DegreeCourse_studentId_degreeId_key`(`studentId`, `degreeId`),
    PRIMARY KEY (`degreeCourseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DegreeCourseState` (
    `degreeCourseStateId` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(35) NOT NULL,
    `name` VARCHAR(128) NOT NULL,

    UNIQUE INDEX `DegreeCourseState_code_key`(`code`),
    PRIMARY KEY (`degreeCourseStateId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubjectProgress` (
    `subjectProgressId` INTEGER NOT NULL AUTO_INCREMENT,
    `expirationDate` DATETIME(3) NULL,
    `subjectId` INTEGER NOT NULL,
    `degreeCourseId` INTEGER NOT NULL,
    `subjectStateId` INTEGER NOT NULL,

    UNIQUE INDEX `SubjectProgress_subjectId_key`(`subjectId`),
    PRIMARY KEY (`subjectProgressId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubjectGrade` (
    `subjectGradeId` INTEGER NOT NULL AUTO_INCREMENT,
    `grade` DECIMAL(65, 30) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `approvedInAnotherSchool` BOOLEAN NOT NULL DEFAULT false,
    `finalExamDateId` INTEGER NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`subjectGradeId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExamPeriod` (
    `examPeriodId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `schoolId` INTEGER NOT NULL,
    `degreeId` INTEGER NOT NULL,
    `examPeriodStateId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`examPeriodId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExamPeriodState` (
    `examPeriodStateId` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(35) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ExamPeriodState_code_key`(`code`),
    PRIMARY KEY (`examPeriodStateId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinalExamDate` (
    `finalExamDateId` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `examPeriodId` INTEGER NOT NULL,
    `subjectId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`finalExamDateId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GraduationPlan` (
    `graduationPlanId` INTEGER NOT NULL AUTO_INCREMENT,
    `degreeCourseId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `GraduationPlan_degreeCourseId_key`(`degreeCourseId`),
    PRIMARY KEY (`graduationPlanId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubjectPlan` (
    `subjectPlanId` INTEGER NOT NULL AUTO_INCREMENT,
    `subjectId` INTEGER NOT NULL,
    `graduationPlanId` INTEGER NOT NULL,
    `examPeriodId` INTEGER NOT NULL,
    `finalExamDateId` INTEGER NULL,

    UNIQUE INDEX `SubjectPlan_graduationPlanId_subjectId_examPeriodId_key`(`graduationPlanId`, `subjectId`, `examPeriodId`),
    PRIMARY KEY (`subjectPlanId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_correlatives` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_correlatives_AB_unique`(`A`, `B`),
    INDEX `_correlatives_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `Profile`(`profileId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Institution` ADD CONSTRAINT `Institution_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`schoolId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Degree` ADD CONSTRAINT `Degree_degreeLevelId_fkey` FOREIGN KEY (`degreeLevelId`) REFERENCES `DegreeLevel`(`degreeLevelId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_degreeId_fkey` FOREIGN KEY (`degreeId`) REFERENCES `Degree`(`degreeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DegreeCourse` ADD CONSTRAINT `DegreeCourse_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`profileId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DegreeCourse` ADD CONSTRAINT `DegreeCourse_degreeCourseStateId_fkey` FOREIGN KEY (`degreeCourseStateId`) REFERENCES `DegreeCourseState`(`degreeCourseStateId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectProgress` ADD CONSTRAINT `SubjectProgress_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`subjectId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectProgress` ADD CONSTRAINT `SubjectProgress_degreeCourseId_fkey` FOREIGN KEY (`degreeCourseId`) REFERENCES `DegreeCourse`(`degreeCourseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectProgress` ADD CONSTRAINT `SubjectProgress_subjectStateId_fkey` FOREIGN KEY (`subjectStateId`) REFERENCES `SubjectState`(`subjectStateId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectGrade` ADD CONSTRAINT `SubjectGrade_finalExamDateId_fkey` FOREIGN KEY (`finalExamDateId`) REFERENCES `FinalExamDate`(`finalExamDateId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamPeriod` ADD CONSTRAINT `ExamPeriod_degreeId_fkey` FOREIGN KEY (`degreeId`) REFERENCES `Degree`(`degreeId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamPeriod` ADD CONSTRAINT `ExamPeriod_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`schoolId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExamPeriod` ADD CONSTRAINT `ExamPeriod_examPeriodStateId_fkey` FOREIGN KEY (`examPeriodStateId`) REFERENCES `ExamPeriodState`(`examPeriodStateId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinalExamDate` ADD CONSTRAINT `FinalExamDate_examPeriodId_fkey` FOREIGN KEY (`examPeriodId`) REFERENCES `ExamPeriod`(`examPeriodId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinalExamDate` ADD CONSTRAINT `FinalExamDate_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`subjectId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GraduationPlan` ADD CONSTRAINT `GraduationPlan_degreeCourseId_fkey` FOREIGN KEY (`degreeCourseId`) REFERENCES `DegreeCourse`(`degreeCourseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectPlan` ADD CONSTRAINT `SubjectPlan_finalExamDateId_fkey` FOREIGN KEY (`finalExamDateId`) REFERENCES `FinalExamDate`(`finalExamDateId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectPlan` ADD CONSTRAINT `SubjectPlan_examPeriodId_fkey` FOREIGN KEY (`examPeriodId`) REFERENCES `ExamPeriod`(`examPeriodId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectPlan` ADD CONSTRAINT `SubjectPlan_graduationPlanId_fkey` FOREIGN KEY (`graduationPlanId`) REFERENCES `GraduationPlan`(`graduationPlanId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectPlan` ADD CONSTRAINT `SubjectPlan_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`subjectId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_correlatives` ADD CONSTRAINT `_correlatives_A_fkey` FOREIGN KEY (`A`) REFERENCES `Subject`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_correlatives` ADD CONSTRAINT `_correlatives_B_fkey` FOREIGN KEY (`B`) REFERENCES `Subject`(`subjectId`) ON DELETE CASCADE ON UPDATE CASCADE;
