"use client";

import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface WikiSearchResult {
  title: string;
  description: string;
  pageUrl: string;
}

interface Profile {
  id: string;
  slug: string;
  name: string;
  thumbnailUrl: string | null;
  createdAt: string;
}

export default function AdminDashboard() {
  const { signOut } = useClerk();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<WikiSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [creating, setCreating] = useState<string | null>(null);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    loadProfiles();
  }, []);

  async function loadProfiles() {
    setLoadingProfiles(true);
    try {
      const res = await fetch("/api/admin/profiles");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load profiles");
      setProfiles(data.profiles);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingProfiles(false);
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    setResults([]);

    try {
      const res = await fetch(
        `/api/admin/wikipedia-search?q=${encodeURIComponent(query)}`,
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Search failed");
      setResults(data.results);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSearching(false);
    }
  }

  async function handleAdd(title: string) {
    setCreating(title);

    try {
      const res = await fetch("/api/admin/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wikipediaTitle: title }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create profile");

      toast.success(`${data.profile.name} added`);
      setResults([]);
      setQuery("");
      loadProfiles();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setCreating(null);
    }
  }

  async function handleDelete(id: string, name: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/profiles/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete profile");

      toast.success(`${name} deleted`);
      setProfiles((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  async function handleLogout() {
    await signOut();
    router.push("/sign-in");
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>
          Log out
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add a Notable Figure</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a name, e.g. Messi"
            />
            <Button type="submit" disabled={searching}>
              {searching ? "Searching..." : "Search"}
            </Button>
          </form>

          {results.length > 0 && (
            <div className="space-y-2">
              {results.map((r) => (
                <div
                  key={r.title}
                  className="flex items-center justify-between gap-4 rounded-md border p-3"
                >
                  <div>
                    <p className="font-medium">{r.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {r.description}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleAdd(r.title)}
                    disabled={creating === r.title}
                  >
                    {creating === r.title ? "Adding..." : "Add"}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Profiles ({profiles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingProfiles ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : profiles.length === 0 ? (
            <p className="text-muted-foreground">No profiles yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          src={profile.thumbnailUrl ?? undefined}
                          alt={profile.name}
                        />
                        <AvatarFallback>
                          {profile.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">
                      {profile.name}
                    </TableCell>
                    <TableCell>
                      <a
                        href={`/${profile.slug}`}
                        target="_blank"
                        className="text-blue-600 hover:underline"
                      >
                        /{profile.slug}
                      </a>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(profile.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger
                          render={
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={deletingId === profile.id}
                            />
                          }
                        >
                          {deletingId === profile.id ? "Deleting..." : "Delete"}
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete {profile.name}?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove this profile and its
                              page at <strong>/{profile.slug}</strong>. This
                              cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDelete(profile.id, profile.name)
                              }
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
