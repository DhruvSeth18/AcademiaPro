import AttendanceModel from '../models/attendenceModel.js';
import ClassModel from '../models/ClassModel.js';

const checkAttendanceToday = async (req, res) => {
    try {
        const studentId = req.query.studentId;
        const classId = req.query.classId;
        console.log(classId, studentId);

        // Validate input
        if (!studentId || !classId) {
            return res.status(400).json({
                status: false,
                message: "Student Id or Class Id is missing"
            });
        }

        // Get the current date at midnight
        const date = new Date().setHours(0, 0, 0, 0);

        // Get the database connection and class model
        const db = req.db;
        const Class = await ClassModel(db);

        // Check if the class exists
        const checkClass = await Class.findById(classId);
        if (!checkClass) {
            return res.status(400).json({
                status: false,
                message: "No Class with this Id exists"
            });
        }

        // Fetch attendance record for the given date
        const Attendance = await AttendanceModel(db);
        const attendanceRecord = await Attendance.findOne({ classId, date });

        // If attendance exists, check if the student is marked present
        if (attendanceRecord) {
            const isPresent = attendanceRecord.presentStudents.includes(studentId);
            return res.status(200).json({
                status: true,
                marked: isPresent,
            });
        }

        // If no attendance record exists for the class on the given date
        return res.status(200).json({
            status: true,
            marked: false
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "An error occurred while checking attendance"
        });
    }
};

const markAttendance = async (req, res) => {
    try {
        const { classId, studentId } = req.query;
        console.log(classId, studentId);

        // Validate input
        if (!classId || !studentId) {
            return res.status(400).json({
                status: false,
                message: "classId or studentId is missing"
            });
        }


        const date = new Date().setHours(0, 0, 0, 0);

        const db = req.db;
        const Class = await ClassModel(db);

        const checkClass = await Class.findById(classId);
        if (!checkClass) {
            return res.status(400).json({
                status: false,
                message: "ClassId is invalid"
            });
        }

        // Fetch or create the attendance record for the given date
        const Attendance = await AttendanceModel(db);
        const attendanceRecord = await Attendance.findOne({ classId, date });

        if (!attendanceRecord) {
            const newRecord = new Attendance({
                classId,
                date,
                presentStudents: [studentId],
                absentStudents: [],
            });
            await newRecord.save();
            return res.status(200).json({
                status: true,
                message: "Attendance marked as Present",
                marked: true
            });
        } else {
            // Toggle attendance status for the student
            const isPresent = attendanceRecord.presentStudents.includes(studentId);
            if (isPresent) {
                // Mark as absent
                attendanceRecord.presentStudents = attendanceRecord.presentStudents.filter(id => id.toString() !== studentId);
                attendanceRecord.absentStudents.push(studentId);
                await attendanceRecord.save();
                return res.status(200).json({
                    status: true,
                    message: "Attendance marked as Absent",
                    marked: false,
                });
            } else {
                // Mark as present
                attendanceRecord.absentStudents = attendanceRecord.absentStudents.filter(id => id.toString() !== studentId);
                attendanceRecord.presentStudents.push(studentId);
                await attendanceRecord.save();
                return res.status(200).json({
                    status: true,
                    message: "Attendance marked as Present",
                    marked: true,
                });
            }
        }

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: "An error occurred while marking attendance"
        });
    } 
};


const getMonthlyAttendance = async (classId, year, month) => {
    const start = new Date(year, month - 1, 1).setHours(0, 0, 0, 0);
    const end = new Date(year, month, 0).setHours(23, 59, 59, 999);
    const db = req.db;
    const Attendence = await AttendanceModel(db);
    const attendanceRecords = await Attendence.find({ classId, date: { $gte: start, $lte: end } });
    const monthlySummary = attendanceRecords.reduce((summary, record) => {
        record.presentStudents.forEach(studentId => {
            summary.present[studentId] = (summary.present[studentId] || 0) + 1;
        });
        record.absentStudents.forEach(studentId => {
            summary.absent[studentId] = (summary.absent[studentId] || 0) + 1;
        });
        return summary;
    }, { present: {}, absent: {} });

    return monthlySummary;
};


const getYearlyAttendance = async (classId, year) => {
    const start = new Date(year, 0, 1).setHours(0, 0, 0, 0);
    const end = new Date(year + 1, 0, 1).setHours(0, 0, 0, 0);
    const db = req.db;
    const Attendence = await AttendanceModel(db);
    const attendanceRecords = await Attendence.find({ classId, date: { $gte: start, $lt: end } });
    const yearlySummary = attendanceRecords.reduce((summary, record) => {
        record.presentStudents.forEach(studentId => {
            summary.present[studentId] = (summary.present[studentId] || 0) + 1;
        });
        record.absentStudents.forEach(studentId => {
            summary.absent[studentId] = (summary.absent[studentId] || 0) + 1;
        });
        return summary;
    }, { present: {}, absent: {} });

    return yearlySummary;
};

export { checkAttendanceToday, markAttendance, getMonthlyAttendance, getYearlyAttendance };