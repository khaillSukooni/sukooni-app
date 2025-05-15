
import { Therapist } from "../types/therapist";

export const mockTherapists: Therapist[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    gender: "Female",
    yearsExperience: 12,
    languages: ["English", "Spanish"],
    specializations: ["Anxiety", "Depression", "Trauma"],
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
    shortBio: "Clinical psychologist with over a decade of experience helping individuals overcome anxiety and depression.",
    longBio: "Dr. Sarah Johnson is a licensed clinical psychologist with over 12 years of experience working with adults and adolescents. She specializes in evidence-based treatments for anxiety, depression, and trauma recovery. Her approach is warm, collaborative, and focused on helping clients build resilience and develop practical skills for managing life's challenges.",
    qualifications: ["Ph.D. in Clinical Psychology", "Licensed Psychologist", "Certified in Cognitive Behavioral Therapy"],
    focusAreas: ["Generalized Anxiety Disorder", "Major Depressive Disorder", "Post-Traumatic Stress Disorder"]
  },
  {
    id: "2",
    name: "Michael Chen, LMFT",
    gender: "Male",
    yearsExperience: 8,
    languages: ["English", "Mandarin"],
    specializations: ["Couples Therapy", "ADHD", "Stress"],
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
    shortBio: "Marriage and family therapist passionate about helping couples improve communication and foster healthy relationships.",
    longBio: "Michael Chen is a Licensed Marriage and Family Therapist with specialized training in couples therapy and ADHD management. With 8 years of clinical experience, Michael brings a systems-oriented approach to therapy, helping individuals and couples understand the patterns that contribute to distress and develop strategies for positive change. He is particularly interested in cross-cultural issues and supporting clients through major life transitions.",
    qualifications: ["Master's in Marriage and Family Therapy", "LMFT", "Gottman Method Level 2 Trained"],
    focusAreas: ["Relationship Counseling", "ADHD Management", "Work-Life Balance", "Cultural Identity"]
  },
  {
    id: "3",
    name: "Dr. Aisha Williams",
    gender: "Female",
    yearsExperience: 15,
    languages: ["English", "French"],
    specializations: ["Trauma", "Anxiety", "Diagnosis"],
    profileImage: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    shortBio: "Experienced clinical psychologist specializing in trauma recovery and anxiety management techniques.",
    longBio: "Dr. Williams brings 15 years of clinical experience working with trauma survivors and those experiencing anxiety disorders. Her therapeutic approach integrates cognitive-behavioral, mindfulness, and somatic techniques to address both the psychological and physiological impacts of trauma and anxiety. She is committed to providing culturally responsive care and creates a safe, supportive environment for clients to process difficult experiences and build resilience.",
    qualifications: ["Ph.D. in Psychology", "Certified Trauma Specialist", "EMDR Practitioner"],
    focusAreas: ["Complex Trauma", "Panic Disorder", "PTSD", "Somatic Experiencing"]
  },
  {
    id: "4",
    name: "Robert Patel, LCSW",
    gender: "Male",
    yearsExperience: 10,
    languages: ["English", "Hindi", "Gujarati"],
    specializations: ["Autism", "ADHD", "Depression"],
    profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    shortBio: "Social worker with extensive experience in neurodiversity support, including autism and ADHD.",
    longBio: "Robert Patel is a Licensed Clinical Social Worker who has dedicated his career to supporting neurodiverse individuals and their families. With 10 years of experience in both clinical and educational settings, Robert offers practical strategies for managing ADHD and autism spectrum conditions, while emphasizing individual strengths and building self-advocacy skills. His approach is client-centered, culturally sensitive, and focused on improving quality of life through practical interventions.",
    qualifications: ["Master's in Social Work", "LCSW", "Certified Autism Specialist"],
    focusAreas: ["Autism Spectrum Disorders", "ADHD Coaching", "Executive Functioning Skills", "Family Support"]
  },
  {
    id: "5",
    name: "Elena Rodriguez, Ph.D.",
    gender: "Female",
    yearsExperience: 7,
    languages: ["English", "Spanish", "Portuguese"],
    specializations: ["Stress", "Anxiety", "Depression"],
    profileImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=922&q=80",
    shortBio: "Clinical psychologist focused on stress management and work-life balance in diverse populations.",
    longBio: "Dr. Elena Rodriguez is a clinical psychologist specializing in stress management, anxiety reduction, and mood disorders. With 7 years of experience and fluency in three languages, she is particularly skilled at working with clients from diverse cultural backgrounds. Elena uses an integrative approach combining cognitive-behavioral therapy, acceptance and commitment therapy, and mindfulness practices to help clients develop healthy coping strategies and achieve greater well-being in their personal and professional lives.",
    qualifications: ["Ph.D. in Clinical Psychology", "Licensed Psychologist", "Certified in Mindfulness-Based Stress Reduction"],
    focusAreas: ["Work-Related Stress", "Anxiety Management", "Bicultural Identity", "Life Transitions"]
  },
  {
    id: "6",
    name: "James Wilson, LPC",
    gender: "Male",
    yearsExperience: 9,
    languages: ["English"],
    specializations: ["Depression", "Grief", "Stress"],
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    shortBio: "Licensed professional counselor specializing in depression, grief, and life transitions.",
    longBio: "James Wilson is a Licensed Professional Counselor with 9 years of experience supporting clients through depression, grief, and major life transitions. His therapeutic approach is humanistic and existential, helping clients navigate difficult emotions while finding meaning and purpose in their experiences. James creates a compassionate, non-judgmental space for clients to explore their thoughts and feelings, while also providing practical tools for mood management and resilience-building.",
    qualifications: ["Master's in Counseling Psychology", "LPC", "Certified Grief Counselor"],
    focusAreas: ["Major Depression", "Grief and Loss", "Life Transitions", "Existential Concerns"]
  }
];

export const allLanguages = Array.from(
  new Set(mockTherapists.flatMap(therapist => therapist.languages))
).sort();

export const allSpecializations = Array.from(
  new Set(mockTherapists.flatMap(therapist => therapist.specializations))
).sort();

export const allGenders = Array.from(
  new Set(mockTherapists.map(therapist => therapist.gender))
).sort();
