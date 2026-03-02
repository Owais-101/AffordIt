import React from 'react';
import useAuth from '@/hooks/useAuth';
import { replace, useNavigate } from 'react-router-dom';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const ProtectedRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate()

    if (loading) return (
        <div className='w-full h-screen flex items-center justify-center overflow-hidden'>
            <Card className="w-[90%] h-[90%] overflow-hidden">
                <CardHeader>
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="aspect-video lg:h-[73%] w-full" />
                </CardContent>
            </Card>
        </div>
    )
    if (!user) return navigate('/', { replace: true });

    return children
}

export default ProtectedRoutes