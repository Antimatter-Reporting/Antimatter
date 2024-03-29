"use client"

import { useData } from "@/providers/data-provider"
import { Skeleton } from "@/components/ui/skeleton"

export function RenderId({id, type}){
    const {engagements, loadingEngagements, findings, loadingFindings, vulnerabilities, loadingVulnerabilities, clients, loadingClients} = useData()

    if (type === "engagement") {
        if (loadingEngagements || !engagements) {
            return <Skeleton className="h-4 w-[150px]" />;
        } else {
            const engagement = engagements.find(engagement => engagement._id === id);
            if (engagement) {
                return engagement.engagementIdentifier;
            } else {
                return <Skeleton className="h-4 w-[150px]" />;
            }
        }
    } else if (type === "client") {
        if (loadingClients || !clients) {
            return <Skeleton className="h-4 w-[150px]" />;
        } else {
            const client = clients.find(client => client._id === id);
            if (client) {
                return client.clientIdentifier;
            } else {
                return <Skeleton className="h-4 w-[150px]" />;
            }
        }
    } else if (type === "finding") {
        if (loadingFindings || !findings) {
            return <Skeleton className="h-4 w-[150px]" />;
        } else {
            const finding = findings.find(finding => finding._id === id);
            if (finding) {
                return finding.findingIdentifier;
            } else {
                return <Skeleton className="h-4 w-[150px]" />;
            }
        }
    } else if (type === "vulnerability") {
        if (loadingVulnerabilities || !vulnerabilities) {
            return <Skeleton className="h-4 w-[150px]" />;
        } else {
            const vulnerability = vulnerabilities.find(vulnerability => vulnerability._id === id);
            if (vulnerability) {
                return vulnerability.vulnerabilityIdentifier;
            } else {
                return <Skeleton className="h-4 w-[150px]" />;
            }
        }
    } else {
        // Handle other types if necessary
        return <Skeleton className="h-4 w-[150px]" />;
    }
}