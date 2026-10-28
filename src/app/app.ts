
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  marks: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  studentName = '';
  marks: number | null = null;
  searchText = '';

  students: Student[] = [
    { id: 1, name: 'Rahul', marks: 78 },
    { id: 2, name: 'Priya', marks: 92 },
    { id: 3, name: 'Aman', marks: 67 },
    { id: 4, name: 'Neha', marks: 82 }
  ];

  get totalStudents(): number {
    return this.students.length;
  }

  get averageMarks(): string {
    if (this.students.length === 0) {
      return '0.00';
    }

    const total = this.students.reduce(
      (sum, student) => sum + student.marks,
      0
    );

    return (total / this.students.length).toFixed(2);
  }

  get filteredStudents(): Student[] {
    const search = this.searchText.trim().toLowerCase();

    return this.students.filter(student =>
      student.name.toLowerCase().includes(search)
    );
  }

  addStudent(): void {
    const name = this.studentName.trim();
    const marks = Number(this.marks);

    if (
      !name ||
      this.marks === null ||
      !Number.isFinite(marks) ||
      marks < 0 ||
      marks > 100
    ) {
      alert('Enter a name and marks between 0 and 100.');
      return;
    }

    const nextId = this.students.length
      ? Math.max(...this.students.map(student => student.id)) + 1
      : 1;

    this.students.push({
      id: nextId,
      name,
      marks
    });

    this.studentName = '';
    this.marks = null;
  }

  deleteStudent(id: number): void {
    if (confirm('Do you want to delete this student?')) {
      this.students = this.students.filter(
        student => student.id !== id
      );
    }
  }
}
