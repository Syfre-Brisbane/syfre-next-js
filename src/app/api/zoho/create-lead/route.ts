import { NextRequest, NextResponse } from 'next/server';
import ZohoOAuthService from '@/lib/zoho-oauth';

export async function POST(request: NextRequest) {
  try {
    const leadData = await request.json();
    
    // Format data for Zoho CRM Leads API
    const zohoLeadData = {
      data: [
        {
          First_Name: leadData.First_Name,
          Last_Name: leadData.Last_Name,
          Email: leadData.Email,
          Phone: leadData.Phone,
          Description: leadData.Description,
          Lead_Source: leadData.Lead_Source || 'Website',
          Company: leadData.Company || 'Prospect',
        }
      ]
    };

    // Use OAuth service to make authenticated request
    const oauthService = new ZohoOAuthService();
    const response = await oauthService.makeAuthenticatedRequest('/crm/v2/Leads', {
      method: 'POST',
      body: JSON.stringify(zohoLeadData),
    });

    const result = await response.json();

    if (response.ok && result.data && result.data[0].status === 'success') {
      const leadId = result.data[0].details.id;
      
      // If this is a workshop application, add the tag
      if (leadData.Workshop_Application === true) {
        try {
          await addTagToLead(oauthService, leadId, 'Workshop Application');
        } catch (tagError) {
          console.error('Failed to add tag to lead:', tagError);
          // Don't fail the entire request if tagging fails
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Lead created successfully',
        leadId: leadId,
      });
    } else {
      console.error('Zoho CRM error:', result);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Failed to create lead in CRM',
          error: result.message || result.data?.[0]?.message || 'Unknown error'
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('API route error:', error);
    
    // Handle OAuth-specific errors
    if (error instanceof Error) {
      if (error.message.includes('No tokens found')) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'CRM integration not configured. Please complete OAuth authorization.',
            requiresAuth: true
          },
          { status: 401 }
        );
      }
      
      if (error.message.includes('Failed to refresh token')) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'CRM authentication expired. Please re-authorize.',
            requiresAuth: true
          },
          { status: 401 }
        );
      }
    }
    
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to add tags to a lead
async function addTagToLead(oauthService: ZohoOAuthService, leadId: string, tagName: string) {
  const tagData = {
    data: [
      {
        id: leadId,
      }
    ],
    tags: [
      {
        name: tagName
      }
    ]
  };

  const response = await oauthService.makeAuthenticatedRequest('/crm/v2/Leads/actions/add_tags', {
    method: 'POST',
    body: JSON.stringify(tagData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to add tag: ${error.message || 'Unknown error'}`);
  }

  return response.json();
}