"use client";
import React from "react";
import { Button } from "@/components/ui/button";

function UpgradePage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Upgrade Your AI Course Experience</h1>

      {/* Upgrade Benefits Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Benefits of Upgrading</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Access to exclusive AI courses and materials.</li>
          <li>Priority support and guidance from experts.</li>
          <li>Advanced analytics to track your progress.</li>
          <li>Downloadable resources and additional content.</li>
          <li>Certification upon completion of upgraded courses.</li>
        </ul>
      </div>

      {/* Pricing Plans Section */}
      <h2 className="text-2xl font-semibold mb-4">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="border rounded-lg p-6 text-center shadow-md">
          <h3 className="text-xl font-bold mb-2">Basic Plan</h3>
          <p className="text-2xl font-semibold mb-4">$9.99/month</p>
          <ul className="list-disc list-inside mb-4">
            <li>Access to basic courses</li>
            <li>Email support</li>
          </ul>
          <Button className="w-full">Select Plan</Button>
        </div>
        <div className="border rounded-lg p-6 text-center shadow-md">
          <h3 className="text-xl font-bold mb-2">Pro Plan</h3>
          <p className="text-2xl font-semibold mb-4">$19.99/month</p>
          <ul className="list-disc list-inside mb-4">
            <li>Access to all courses</li>
            <li>Priority support</li>
            <li>Downloadable content</li>
          </ul>
          <Button className="w-full">Select Plan</Button>
        </div>
        <div className="border rounded-lg p-6 text-center shadow-md">
          <h3 className="text-xl font-bold mb-2">Premium Plan</h3>
          <p className="text-2xl font-semibold mb-4">$29.99/month</p>
          <ul className="list-disc list-inside mb-4">
            <li>All Pro Plan features</li>
            <li>Personalized coaching</li>
            <li>Certification upon completion</li>
          </ul>
          <Button className="w-full">Select Plan</Button>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Upgrade?</h2>
        <Button className="bg-primary text-white py-2 px-4 rounded-lg">
          Upgrade Now
        </Button>
      </div>

      {/* Footer Section */}
      <footer className="mt-10 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} AI Course. All rights reserved.</p>
        <p>Contact us for more information.</p>
      </footer>
    </div>
  );
}

export default UpgradePage;
