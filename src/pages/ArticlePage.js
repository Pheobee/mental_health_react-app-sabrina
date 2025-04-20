import React from "react";
import { useParams } from "react-router-dom";
import resource1pic from "../img/Anxiety-amico.svg";
import resource2pic from "../img/Alone-amico.svg";
import resource3pic from "../img/Depression-rafiki.svg";
import "../css/ArticlePage.css";
import { Link } from 'react-router-dom';
import '../css/Header.css';
import logo from '../img/logo.jpg'
import resource4pic from "../img/Mental health-amico.png";

const resources = {
    "coping-with-stress": {
      title: "Coping with Stress in College",
      content: `College life can be both exciting and overwhelming. Students often face academic pressure, 
      financial challenges, and the struggle of balancing social life with studies. Stress can be caused 
      by upcoming exams, assignments, or even adjusting to a new environment. To cope with stress, students 
      should develop effective time management skills, such as creating schedules and prioritizing tasks. 
  
      Maintaining a healthy lifestyle is equally important. Regular exercise, a balanced diet, and adequate 
      sleep can significantly reduce stress levels. Another effective strategy is building a support system. 
      Talking to friends, family, or campus counselors about your feelings can help alleviate anxiety.
  
      Additionally, practicing mindfulness and relaxation techniques, such as yoga or meditation, can calm 
      the mind and improve focus. It’s essential to recognize the signs of burnout and take breaks when needed. 
      Remember, seeking professional help is not a weakness but a strength when managing mental health.`,
      author: "J. Rowling",
      date: "March, 2024",
      image: resource1pic,
    },
    "stress-management": {
      title: "Stress Management Techniques",
      content: `Stress is a natural part of life, but unmanaged stress can lead to serious health problems. 
      Managing stress effectively begins with identifying its sources. Common stressors include work demands, 
      financial concerns, and interpersonal conflicts. 
  
      One of the most effective stress management techniques is deep breathing. It activates the parasympathetic 
      nervous system, which calms the body. Regular physical activity, such as walking, jogging, or yoga, 
      is another proven way to manage stress. Exercise releases endorphins, which are natural mood elevators. 
  
      Time management plays a critical role as well. Breaking tasks into smaller, manageable pieces and setting 
      realistic goals can reduce the feeling of being overwhelmed. Journaling is also an effective outlet for 
      processing emotions and thoughts.
  
      Lastly, engaging in hobbies, spending time in nature, and connecting with loved ones can boost mental 
      resilience. Remember, small changes in daily habits can lead to significant improvements in stress levels.`,
      author: "A. Smith",
      date: "May, 2023",
      image: resource2pic,
    },
    "work-stress": {
      title: "Work Stress Management",
      content: `Work-related stress is a growing concern for professionals across industries. Tight deadlines, 
      heavy workloads, and lack of work-life balance are some of the leading causes. To manage work stress, 
      employees should start by setting clear boundaries. Avoid checking emails or working outside office hours. 
  
      Effective communication with colleagues and supervisors is key. Discuss workload challenges and seek 
      support when needed. Delegating tasks can also reduce stress and improve team collaboration. Another 
      strategy is to create an organized workspace. A clutter-free environment can enhance focus and reduce anxiety.
  
      Taking regular breaks is crucial for maintaining productivity. Short walks or mindfulness exercises during 
      breaks can re-energize the mind. Learning to say no to additional responsibilities when overwhelmed is 
      also essential.
  
      Employers can support their teams by promoting a healthy workplace culture. Providing flexible work 
      arrangements, mental health resources, and stress management workshops can make a significant difference. 
      Remember, addressing work stress is not just about productivity but also overall well-being.`,
      author: "E. Nolan",
      date: "Jan, 2024",
      image: resource3pic,
    },
    "mood-swings": {
  title: "Understanding Mood Swings",
  content: `Mood swings are sudden and intense changes in emotional states, often moving from happiness to sadness or irritability within a short period. While occasional mood changes are part of life, frequent or extreme shifts can impact daily functioning and relationships.

  Common causes of mood swings include hormonal fluctuations, stress, poor sleep, unresolved trauma, or underlying mental health conditions such as bipolar disorder or depression. Even dietary habits and lack of exercise can contribute to emotional instability.

  Recognizing your emotional triggers is the first step to managing mood swings. Keeping a mood journal or using mood tracking apps helps identify patterns over time. Practicing mindfulness and deep breathing exercises can anchor you in the present and reduce emotional reactivity.

  Consistency in lifestyle also plays a role. Maintaining regular sleep, eating nutrient-rich meals, engaging in physical activity, and limiting caffeine or alcohol can help balance your emotional state.

  If mood swings start interfering with your work, school, or relationships, it’s important to seek help from a mental health professional. Therapy and medical evaluation can uncover underlying causes and guide you toward personalized solutions.

  Remember, your emotions are valid — understanding them is a step toward healing and emotional resilience.`,
  author: "J. Reynolds",
  date: "April, 2024",
  image:resource4pic ,
}

  };
  
const ArticlePage = () => {
  const { id } = useParams();
  const article = resources[id];

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="article-page">
               
      <h1>{article.title}</h1>
      <img src={article.image} alt={article.title} />
      <p><strong>Author:</strong> {article.author}</p>
      <p><strong>Date:</strong> {article.date}</p>
      <p>{article.content}</p>
    </div>
  );
};

export default ArticlePage;
