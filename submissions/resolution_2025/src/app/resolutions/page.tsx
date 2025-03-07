"use client";
import { useState } from "react";
import { Sparkles, Trophy, Heart, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Resolutions() {
  const [resolutions, setResolutions] = useState([
    {
      id: 1,
      text: "Read 24 books in 2025",
      category: "Personal Growth",
      progress: 0,
      likes: 12,
      inspired: 5,
    },
    {
      id: 2,
      text: "Volunteer at local shelter monthly",
      category: "Community",
      progress: 8,
      likes: 24,
      inspired: 8,
    },
  ]);

  const [newResolution, setNewResolution] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Personal Growth");

  const categories = [
    "Personal Growth",
    "Health",
    "Career",
    "Community",
    "Environment",
  ];

  const addResolution = () => {
    if (newResolution.trim()) {
      setResolutions([
        ...resolutions,
        {
          id: Date.now(),
          text: newResolution,
          category: selectedCategory,
          progress: 0,
          likes: 0,
          inspired: 0,
        },
      ]);
      setNewResolution("");
    }
  };

  const updateProgress = (id: number, increment: any) => {
    setResolutions(
      resolutions.map((resolution) => {
        if (resolution.id === id) {
          const newProgress = Math.max(
            0,
            Math.min(100, resolution.progress + increment)
          );
          return { ...resolution, progress: newProgress };
        }
        return resolution;
      })
    );
  };

  const incrementLikes = (id: any) => {
    setResolutions(
      resolutions.map((resolution) => {
        if (resolution.id === id) {
          return { ...resolution, likes: resolution.likes + 1 };
        }
        return resolution;
      })
    );
  };

  const incrementInspired = (id: any) => {
    setResolutions(
      resolutions.map((resolution) => {
        if (resolution.id === id) {
          return { ...resolution, inspired: resolution.inspired + 1 };
        }
        return resolution;
      })
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            Resolution Revolution Challenge 2025
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              className="px-3 py-2 border rounded-md"
              value={newResolution}
              onChange={(e) => setNewResolution(e.target.value)}
              placeholder="Enter your resolution..."
              // className="flex-grow"
            />
            <select
              className="px-3 py-2 border rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <Button onClick={addResolution}>Add Resolution</Button>
          </div>

          <div className="space-y-4">
            {resolutions.map((resolution) => (
              <Card key={resolution.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-lg">{resolution.text}</h3>
                    <Badge variant="secondary" className="mt-1">
                      {resolution.category}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => incrementLikes(resolution.id)}
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      {resolution.likes}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => incrementInspired(resolution.id)}
                    >
                      <Trophy className="w-4 h-4 mr-1" />
                      {resolution.inspired}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Progress value={resolution.progress} className="w-full" />
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateProgress(resolution.id, -10)}
                      >
                        -10%
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateProgress(resolution.id, 10)}
                      >
                        +10%
                      </Button>
                    </div>
                    <span className="text-sm text-gray-500">
                      Progress: {resolution.progress}%
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
