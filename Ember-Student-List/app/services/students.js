import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class StudentsService extends Service {
    @tracked students = [
        { name: "Aakash", reg: 962821205001, dept: "IT", clg: "UCEN", skills: ["JavaScript", "React"] },
        { name: "Abishek", reg: 962821205002, dept: "IT", clg: "UCEN", skills: ["Spring Boot", "Flutter"] },
        { name: "Ajay", reg: 962821205003, dept: "CSE", clg: "UCEN", skills: ["Spring Boot", "MySQL"] },
        { name: "Arun", reg: 962821205004, dept: "IT", clg: "UCEN", skills: ["React", "Spring Boot"] },
        { name: "Aswin", reg: 962821205005, dept: "IT", clg: "UCEN", skills: ["Node.js", "MySQL"] },
        { name: "Bala", reg: 962821205006, dept: "CSE", clg: "UCEN", skills: ["CSS", "Node.js"] },
        { name: "Bhavesh", reg: 962821205007, dept: "IT", clg: "UCEN", skills: ["Flutter", "Spring Boot"] },
        { name: "Charan", reg: 962821205008, dept: "CSE", clg: "UCEN", skills: ["CSS", "MySQL"] },
        { name: "Deepak", reg: 962821205009, dept: "IT", clg: "UCEN", skills: ["JavaScript", "Spring Boot"] },
        { name: "Dev", reg: 962821205010, dept: "IT", clg: "UCEN", skills: ["React", "HTML"] },
        { name: "Dinesh", reg: 962821205011, dept: "IT", clg: "UCEN", skills: ["JavaScript", "HTML"] },
        { name: "Ethan", reg: 962821205012, dept: "CSE", clg: "UCEN", skills: ["Node.js", "JavaScript"] },
        { name: "Elavarasan", reg: 962821205013, dept: "IT", clg: "UCEN", skills: ["HTML", "React"] },
        { name: "Faiz", reg: 962821205014, dept: "IT", clg: "UCEN", skills: ["Spring Boot", "CSS"] },
        { name: "Gokul", reg: 962821205015, dept: "CSE", clg: "UCEN", skills: ["MySQL", "Flutter"] },
        { name: "Guhan", reg: 962821205016, dept: "CSE", clg: "UCEN", skills: ["Flutter", "React"] },
        { name: "Hari", reg: 962821205017, dept: "CSE", clg: "UCEN", skills: ["CSS", "HTML"] },
        { name: "Harish", reg: 962821205018, dept: "IT", clg: "UCEN", skills: ["Node.js", "CSS"] },
        { name: "Harsha", reg: 962821205019, dept: "IT", clg: "UCEN", skills: ["MySQL", "HTML"] },
        { name: "Imran", reg: 962821205020, dept: "CSE", clg: "UCEN", skills: ["Node.js", "JavaScript"] },
        { name: "Irfan", reg: 962821205021, dept: "CSE", clg: "UCEN", skills: ["Spring Boot", "JavaScript"] },
        { name: "Jagan", reg: 962821205022, dept: "IT", clg: "UCEN", skills: ["React", "Spring Boot"] },
        { name: "Jeeva", reg: 962821205023, dept: "IT", clg: "UCEN", skills: ["HTML", "Node.js"] },
        { name: "Karthik", reg: 962821205024, dept: "IT", clg: "UCEN", skills: ["Flutter", "React"] },
        { name: "Keerthi", reg: 962821205025, dept: "IT", clg: "UCEN", skills: ["React", "CSS"] },
        { name: "Kiran", reg: 962821205026, dept: "IT", clg: "UCEN", skills: ["CSS", "Flutter"] },
        { name: "Kavin", reg: 962821205027, dept: "CSE", clg: "UCEN", skills: ["Spring Boot", "React"] },
        { name: "Lalith", reg: 962821205028, dept: "CSE", clg: "UCEN", skills: ["HTML", "MySQL"] },
        { name: "Lokesh", reg: 962821205029, dept: "CSE", clg: "UCEN", skills: ["Flutter", "MySQL"] },
        { name: "Manoj", reg: 962821205030, dept: "IT", clg: "UCEN", skills: ["JavaScript", "React"] },
        { name: "Muhamad", reg: 962821205031, dept: "IT", clg: "UCEN", skills: ["JavaScript", "React"] },
        { name: "Naveen", reg: 962821205032, dept: "CSE", clg: "UCEN", skills: ["Spring Boot", "Node.js"] },
        { name: "Nithin", reg: 962821205033, dept: "IT", clg: "UCEN", skills: ["Node.js", "CSS"] },
        { name: "Omprakash", reg: 962821205034, dept: "IT", clg: "UCEN", skills: ["CSS", "HTML"] },
        { name: "Pranav", reg: 962821205035, dept: "CSE", clg: "UCEN", skills: ["MySQL", "JavaScript"] },
        { name: "Praveen", reg: 962821205036, dept: "CSE", clg: "UCEN", skills: ["MySQL", "HTML"] },
        { name: "Raj", reg: 962821205037, dept: "IT", clg: "UCEN", skills: ["React", "Flutter"] },
        { name: "Ragul", reg: 962821205038, dept: "IT", clg: "UCEN", skills: ["Node.js", "Flutter"] },
        { name: "Ruban", reg: 962821205039, dept: "CSE", clg: "UCEN", skills: ["HTML", "CSS"] },
        { name: "Sanjay", reg: 962821205040, dept: "IT", clg: "UCEN", skills: ["Node.js", "Spring Boot"] },
        { name: "Sathish", reg: 962821205041, dept: "IT", clg: "UCEN", skills: ["JavaScript", "Node.js"] },
        { name: "Suriya", reg: 962821205042, dept: "IT", clg: "UCEN", skills: ["HTML", "JavaScript"] },
        { name: "Surya", reg: 962821205043, dept: "CSE", clg: "UCEN", skills: ["React", "Flutter"] },
        { name: "Tharun", reg: 962821205044, dept: "CSE", clg: "UCEN", skills: ["HTML", "CSS"] },
        { name: "Udhay", reg: 962821205045, dept: "IT", clg: "UCEN", skills: ["JavaScript", "MySQL"] },
        { name: "Venkatesh", reg: 962821205046, dept: "CSE", clg: "UCEN", skills: ["React", "Flutter"] },
        { name: "Vijay", reg: 962821205047, dept: "IT", clg: "UCEN", skills: ["Flutter", "MySQL"] },
        { name: "Vimal", reg: 962821205048, dept: "CSE", clg: "UCEN", skills: ["React", "CSS"] },
        { name: "Yogesh", reg: 962821205049, dept: "IT", clg: "UCEN", skills: ["Spring Boot", "CSS"] },
        { name: "Zaid", reg: 962821205050, dept: "CSE", clg: "UCEN", skills: ["Node.js", "HTML"] },
      ];            

    @tracked filteredStudents = this.students;

    searchStudents(query) {
        query = query.toLowerCase();
        this.filteredStudents = this.students.filter(student => {
            const reg = student.reg ? student.reg.toString().toLowerCase() : '';
            return student.name.toLowerCase().includes(query) ||
                reg.includes(query) || 
                student.dept.toLowerCase().includes(query) ||
                student.clg.toLowerCase().includes(query);
        });
    }

}
