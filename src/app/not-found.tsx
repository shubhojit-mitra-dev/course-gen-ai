"use client";
import FuzzyText from '@/components/ui/fuzzytext';
import { useTheme } from 'next-themes';

import React from 'react'

function NotFound() {
    const { theme } = useTheme();
    return (
        <div className='h-screen bg-background flex flex-col items-center justify-center'>
            <FuzzyText
                color={theme === 'light' ? '#000' : '#fff'} hoverIntensity={0.5}
                enableHover={true}
            >
                404
            </FuzzyText>
            <FuzzyText
                color={theme === 'light' ? '#000' : '#fff'} hoverIntensity={0.5}
                enableHover={true}
                fontSize={50}
            >
                not found
            </FuzzyText>
        </div>
    )
}

export default NotFound