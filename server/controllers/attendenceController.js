import AttendanceModel from '../models/attendenceModel.js';

const checkAttendanceToday = async (req,res) => {
    const studentId = req.query.studentId;
    const classId = req.headers.classid;
    const date = new Date().setHours(0, 0, 0, 0);
    const db = req.db;
    const Attendence = await AttendanceModel(db);
    const attendanceRecord = await Attendence.findOne({ classId, date });
    if (attendanceRecord) {
        const isPresent = attendanceRecord.presentStudents.includes(studentId);
        return res.status(200).json({ 
            status:true,
            marked:isPresent,
        });
    }
    return res.status(200).json({
        status:true, 
        marked: false
    });
};


const markAttendance = async (req,res) => {
    const {classId,studentId} = req.body;
    const date = new Date().setHours(0, 0, 0, 0); // Current date without time
    const db = req.db;
    const Attendence = await AttendanceModel(db);
    const attendanceRecord = await Attendence.findOne({ classId, date });
    if (!attendanceRecord) {
        const newRecord = new AttendanceModel({
            classId,
            date,
            presentStudents: [studentId],
            absentStudents: [],
        });
        await newRecord.save();
        return res.status(200).json({
            status:true,
            message:"Attendance marked as present",
            marked:true
        })
    } else {
        const isPresent = attendanceRecord.presentStudents.includes(studentId);
        if (isPresent) {
            attendanceRecord.presentStudents = attendanceRecord.presentStudents.filter(id => id.toString() !== studentId);
            attendanceRecord.absentStudents.push(studentId);
            await attendanceRecord.save();
            return res.status(200).json({
                status:true,
                message:"Attendance marked as Absent",
                marked:false,
            })
        } else {
            attendanceRecord.absentStudents = attendanceRecord.absentStudents.filter(id => id.toString() !== studentId);
            attendanceRecord.presentStudents.push(studentId);
            await attendanceRecord.save();
            return res.status(200).json({
                status:true,
                message:"Attendance marked as Present",
                marked:true,
            })
        }
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