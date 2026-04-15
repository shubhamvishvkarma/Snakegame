using System;
using System.Collections.Generic;
using System.Linq;
class Student
{
    public string Name { get; set; }
    public int Age { get; set; }
}
class program
{
    static void Main()
    {
        List<Student> students = new List<Student>
        {
            new Student { Name = "Alice", Age = 20 },
            new Student { Name = "Bob", Age = 22 },
            new Student { Name = "Charlie", Age = 21 }
        };
        var result =from s in students
                    where s.Age > 20
                    select s.Name;
                    foreach(var name in result)
                    {
                        Console.WriteLine(name);
                    }
    }
}
