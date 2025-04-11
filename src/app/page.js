'use client'

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const questions = [
  {
    id: 1,
    question: "抗体の基本構造とその働きを簡潔に述べよ。",
    answer: "抗体はY字型の構造を持ち、抗原と特異的に結合して中和や凝集を行う。"
  },
  {
    id: 2,
    question: "免疫記憶の仕組みとその利点を説明せよ。",
    answer: "免疫記憶は記憶細胞によって保持され、同じ病原体に再感染した際に迅速な免疫応答が可能になる。"
  },
];

export default function SimpleMode() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timer < 10) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (timer >= 10) {
      setShowAnswer(true);
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handleStart = () => {
    setShowAnswer(false);
    setTimer(0);
    setIsRunning(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % questions.length);
    setShowAnswer(false);
    setTimer(0);
    setIsRunning(false);
  };

  const current = questions[currentIndex];

  return (
    <div className="p-4 max-w-md mx-auto">
      <Card className="mb-4">
        <CardContent className="p-4 space-y-2">
          <h2 className="text-lg font-semibold">問題 {current.id}</h2>
          <p>{current.question}</p>
          {isRunning && <p className="text-sm text-gray-500">{10 - timer} 秒後に解答が表示されます…</p>}
          {showAnswer && (
            <div className="mt-2 p-2 border rounded bg-green-50">
              <p className="font-medium">模範解答：</p>
              <p>{current.answer}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button onClick={handleStart}>スタート</Button>
        <Button variant="secondary" onClick={handleNext}>次の問題</Button>
      </div>
    </div>
  );
}
